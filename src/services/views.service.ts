import { Injectable } from '@nestjs/common';
import { ViewsRepository } from 'src/repository/views.repository';
import { ViewDto } from 'src/types/dto/view.dto';
import { WorkOrdersService } from './work-orders.service';
import { BulkViewDto } from 'src/types/dto/bulk-view.dto';
import { View } from 'src/types/model/view.model';

@Injectable()
export class ViewsService {
  constructor(
    private readonly viewsRepository: ViewsRepository,
    private readonly workOrderService: WorkOrdersService,
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

    const workOrders =
      await this.workOrderService.getAllByWorkspace(workSpaceId);

    const workCenters = new Set<string>();

    for (const wo of workOrders) {
      if (wo.data.workCenterId) {
        workCenters.add(wo.data.workCenterId);
      }
    }

    return {
      viewId: view.id,
      name: view.name,
      workCenterIds: Array.from(workCenters).map((id) => id),
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
