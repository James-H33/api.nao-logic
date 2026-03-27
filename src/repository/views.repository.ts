import { View } from 'src/types/model/view.model';
import { DatabaseService } from './database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ViewsRepository {
  constructor(private readonly db: DatabaseService) {}

  async getViewById(id: string): Promise<View | null> {
    const res = await this.db
      .getDb()
      .get<View | null>(`SELECT * FROM views WHERE id = ?`, [id]);

    return res ?? null;
  }

  async getViewsByWorkspaceId(workspaceId: string): Promise<View[]> {
    try {
      const res = await this.db
        .getDb()
        .all<
          View[]
        >(`SELECT * FROM views WHERE workspace_id = ?`, [workspaceId]);

      return res ?? [];
    } catch (error) {
      console.error('Error fetching views by workspace ID:', error);
      return [];
    }
  }

  async createView(view: View): Promise<View> {
    await this.db
      .getDb()
      .run(`INSERT INTO views (id, name, workspace_id) VALUES (?, ?, ?)`, [
        view.id,
        view.name,
        view.workspace_id,
      ]);

    console.log('Created view with id:', view.id);

    return {
      id: view.id,
      name: view.name,
      workspace_id: view.workspace_id,
    };
  }
}
