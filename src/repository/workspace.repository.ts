import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database';
import { Workspace } from 'src/types/model/workspace.model';

@Injectable()
export class WorkspaceRepository {
  constructor(private readonly db: DatabaseService) {}

  async getAll(): Promise<Workspace[]> {
    const res = await this.db
      .getDb()
      .all<Workspace[]>('SELECT * FROM workspaces');

    return res;
  }

  // async getOne(id: string): Promise<User | null> {
  //   const res = await this.db
  //     .getDb()
  //     .get<User>('SELECT * FROM users WHERE id = ?', [id]);

  //   if (!res) {
  //     return null;
  //   }

  //   return res;
  // }

  // async create(user: {
  //   id: string;
  //   name: string;
  //   email: string;
  //   workspaceId: string;
  // }): Promise<void> {
  //   const { id, name, email, workspaceId } = user;

  //   await this.db
  //     .getDb()
  //     .run(
  //       'INSERT INTO users (id, name, email, workspace_id) VALUES (?, ?, ?, ?)',
  //       [id, name, email, workspaceId],
  //     );
  // }
}
