import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HeaderCredentials } from 'src/types/header-credentials.interface';

export const Credentials = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): HeaderCredentials => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'] as string;
    const workspaceId = request.headers['workspace-id'] as string;
    const authToken = authHeader.split(' ')[1];

    return { authToken, workspaceId };
  },
);
