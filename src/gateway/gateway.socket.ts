import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WorkspaceId } from 'src/common/decorators/workspace-id.decorator';

type WorkspaceId = string;
type AuthToken = string;

@WebSocketGateway({
  cors: true,
})
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {
  static instanceCount: number = 0;

  private rooms = new Map<WorkspaceId, Map<AuthToken, Socket>>();

  // We need a reverse lookup to find the auth token for a given client socket when they disconnect
  private clientToAuthToken = new Map<string, AuthToken>();

  @WebSocketServer()
  server!: Server;

  private logger: Logger = new Logger('Gateway');

  constructor() {
    Gateway.instanceCount++;

    if (Gateway.instanceCount > 1) {
      // Crash the application if more than one instance of the gateway is created

      throw new Error(
        `Multiple instances of Gateway detected. Instance count: ${Gateway.instanceCount}`,
      );
    }
  }

  @SubscribeMessage('msgToServer')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('msgToClient', message);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);

    const authHeader = client.handshake.headers['authorization'] as string;
    const workspaceId = client.handshake.headers['workspace-id'] as string;
    const authToken = authHeader.split(' ')[1];

    let room = this.rooms.get(workspaceId);

    if (!room) {
      room = new Map<AuthToken, Socket>();
      console.log(`Created new room for workspace: ${workspaceId}`);
    }

    room.set(authToken, client);
    this.rooms.set(workspaceId, room);

    await client.join(workspaceId);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  sendMessage<T>(
    type: string,
    room: WorkspaceId,
    body: T,
    config: { ignore?: string[] } = {},
  ): void {
    const roomClients = this.rooms.get(room);
    const clientIdsToIgnore: string[] = [];

    for (const authToken of config.ignore || []) {
      const client = roomClients?.get(authToken);

      if (client) {
        clientIdsToIgnore.push(client.id);
      }
    }

    this.server.to(room).except(clientIdsToIgnore).emit(type, body);
  }
}
