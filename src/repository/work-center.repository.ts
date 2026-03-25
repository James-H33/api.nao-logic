import { Injectable } from '@nestjs/common';
import { WorkCenter } from 'src/types/model/work-center.model';
import { DatabaseService } from './database';

@Injectable()
export class WorkCenterRepository {
  constructor(private readonly db: DatabaseService) {}

  async getAll(): Promise<WorkCenter[]> {
    const res = await this.db
      .getDb()
      .all<WorkCenter[]>('SELECT * FROM work_centers');

    return res;
  }

  async getByWorkspaceId(workspaceId: string): Promise<WorkCenter[]> {
    const res = await this.db
      .getDb()
      .all<
        WorkCenter[]
      >('SELECT * FROM work_centers WHERE workspace_id = ?', [workspaceId]);

    return res;
  }

  async create(workCenter: {
    id: string;
    name: string;
    workspace_id: string;
  }): Promise<void> {
    const { id, name, workspace_id } = workCenter;

    await this.db
      .getDb()
      .run(
        'INSERT INTO work_centers (id, name, workspace_id) VALUES (?, ?, ?)',
        [id, name, workspace_id],
      );
  }

  async delete(id: string): Promise<void> {
    await this.db.getDb().run('DELETE FROM work_centers WHERE id = ?', [id]);
  }
}
