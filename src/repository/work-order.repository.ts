import { Injectable } from '@nestjs/common';
import { WorkOrder } from 'src/types/model/work-order.model';
import { DatabaseService } from './database';

@Injectable()
export class WorkOrderRepository {
  constructor(private readonly db: DatabaseService) {}

  async getAll(): Promise<WorkOrder[]> {
    const res = await this.db
      .getDb()
      .all<WorkOrder[]>('SELECT * FROM work_orders');

    return res;
  }

  async create(workOrder: WorkOrder): Promise<void> {
    const {
      id,
      name,
      description,
      start_date,
      end_date,
      status,
      workspace_id,
      work_center_id,
    } = workOrder;

    await this.db
      .getDb()
      .run(
        'INSERT INTO work_orders (id, name, description, start_date, end_date, status, workspace_id, work_center_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          id,
          name,
          description,
          start_date,
          end_date,
          status,
          workspace_id,
          work_center_id,
        ],
      );
  }
}
