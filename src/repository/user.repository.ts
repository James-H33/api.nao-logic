import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database';
import { User } from 'src/types/model/user.model';

@Injectable()
export class UserRepository {
  constructor(private readonly db: DatabaseService) {}

  async getAll(): Promise<User[]> {
    const res = await this.db.getDb().all<User[]>('SELECT * FROM users');

    return res;
  }

  async getOne(id: string): Promise<User | null> {
    const res = await this.db
      .getDb()
      .get<User>('SELECT * FROM users WHERE id = ?', [id]);

    if (!res) {
      return null;
    }

    return res;
  }

  async create(user: {
    id: string;
    name: string;
    email: string;
    workspaceId: string;
  }): Promise<void> {
    const { id, name, email, workspaceId } = user;

    await this.db
      .getDb()
      .run(
        'INSERT INTO users (id, name, email, workspace_id) VALUES (?, ?, ?, ?)',
        [id, name, email, workspaceId],
      );
  }
}
