import { Injectable } from '@nestjs/common';
import { ViewsRepository } from 'src/repository/views.repository';
import { ViewDto } from 'src/types/dto/view.dto';
import { WorkOrdersService } from './work-orders.service';
import { BulkViewDto } from 'src/types/dto/bulk-view.dto';
import { View } from 'src/types/model/view.model';
import { WorkCentersService } from './work-centers.service';

@Injectable()
export class ViewsService {
  constructor(
    private readonly viewsRepository: ViewsRepository,
    private readonly workOrderService: WorkOrdersService,
    private readonly workCenterService: WorkCentersService,
  ) {}

  async getViewsByWorkspaceId(workspaceId: string): Promise<BulkViewDto[]> {
    const views = await this.viewsRepository.getViewsByWorkspaceId(workspaceId);

    return views.map((view) => this.mapToBulkViewDto(view));
  }

  async createView(name: string, workspaceId: string): Promise<BulkViewDto> {
    const id = crypto.randomUUID();

    const view = await this.viewsRepository.createView({
      id,
      name,
      workspace_id: workspaceId,
    });

    return this.mapToBulkViewDto(view);
  }

  async getViewById(id: string): Promise<ViewDto> {
    const view = await this.viewsRepository.getViewById(id);

    if (!view) {
      throw new Error(`View with id ${id} not found`);
    }

    const workSpaceId = view.workspace_id;

    const workOrdersReq = this.workOrderService.getAllByWorkspace(workSpaceId);
    const workCentersReq =
      this.workCenterService.getAllByWorkspace(workSpaceId);

    const [workOrders, workCenters] = await Promise.all([
      workOrdersReq,
      workCentersReq,
    ]);

    return {
      viewId: view.id,
      name: view.name,
      workCenterIds: workCenters.map((wc) => wc.docId),
      workOrderIds: workOrders.map((wo) => wo.docId),
    };
  }

  mapToBulkViewDto(view: View): BulkViewDto {
    return {
      viewId: view.id,
      name: view.name,
    };
  }
}
