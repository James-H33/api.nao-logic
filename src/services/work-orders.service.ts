import { Injectable } from '@nestjs/common';
import { Gateway } from 'src/gateway/gateway.socket';
import { WorkOrderRepository } from 'src/repository/work-order.repository';
import { CreateWorkOrderDto } from 'src/types/dto/create-work-order.dto';
import { UpdateWorkOrderDto } from 'src/types/dto/update-work-order.dto';
import { WorkOrderDocumentDto } from 'src/types/dto/work-order-document.dto';
import { HeaderCredentials } from 'src/types/header-credentials.interface';
import { WorkOrder } from 'src/types/model/work-order.model';
import { SocketMessages } from 'src/types/socket-messages.enum';
import { WorkOrderStatus } from 'src/types/work-order-status';

@Injectable()
export class WorkOrdersService {
  constructor(
    private readonly workOrderRepository: WorkOrderRepository,
    private readonly gateway: Gateway,
  ) {}

  async getAll(): Promise<WorkOrderDocumentDto[]> {
    const results = await this.workOrderRepository.getAll();

    return results.map((result) => this.toDto(result));
  }

  async getAllByWorkspace(
    workspaceId: string,
  ): Promise<WorkOrderDocumentDto[]> {
    const allWorkOrders = await this.workOrderRepository.getAll();
    const results: WorkOrderDocumentDto[] = [];

    for (const workOrder of allWorkOrders) {
      if (workOrder.workspace_id === workspaceId) {
        results.push(this.toDto(workOrder));
      }
    }

    return results;
  }

  async getBulk(
    ids: string[],
    workspaceId: string,
  ): Promise<WorkOrderDocumentDto[]> {
    const allWorkOrders = await this.workOrderRepository.getAll();
    const workOrdersMap = new Map<string, WorkOrder>();

    for (const workOrder of allWorkOrders) {
      workOrdersMap.set(workOrder.id, workOrder);
    }

    const results: WorkOrderDocumentDto[] = [];

    for (const id of ids) {
      const workOrder = workOrdersMap.get(id);

      if (workOrder && workOrder.workspace_id === workspaceId) {
        results.push(this.toDto(workOrder));
      }
    }

    return results;
  }

  async create(
    workOrder: CreateWorkOrderDto,
    { workspaceId, authToken }: HeaderCredentials,
  ): Promise<WorkOrderDocumentDto> {
    const id = crypto.randomUUID();

    // Would we add some logic here to check if the work center exists before creating the work order?

    const newWorkOrder = {
      id,
      name: workOrder.name,
      description: workOrder.description,
      work_center_id: workOrder.workCenterId,
      workspace_id: workspaceId,
      status: workOrder.status,
      start_date: workOrder.startDate,
      end_date: workOrder.endDate,
    };

    await this.workOrderRepository.create(newWorkOrder);

    this.gateway.sendMessage(
      SocketMessages.WORK_ORDER_CREATED,
      workspaceId,
      {
        workOrderIds: [id],
        workspaceId,
      },
      { ignore: [authToken] },
    );

    return this.toDto(newWorkOrder);
  }

  async update(
    workOrder: UpdateWorkOrderDto,
    { workspaceId, authToken }: HeaderCredentials,
  ): Promise<WorkOrderDocumentDto> {
    const newWorkOrder = {
      id: workOrder.id,
      name: workOrder.name,
      description: workOrder.description,
      work_center_id: workOrder.workCenterId,
      workspace_id: workspaceId,
      status: workOrder.status,
      start_date: workOrder.startDate,
      end_date: workOrder.endDate,
    };

    await this.workOrderRepository.update(newWorkOrder, workspaceId);

    this.gateway.sendMessage(
      SocketMessages.WORK_ORDER_UPDATED,
      workspaceId,
      {
        workOrderIds: [newWorkOrder.id],
        workspaceId,
      },
      {
        ignore: [authToken],
      },
    );

    return this.toDto(newWorkOrder);
  }

  async delete(
    id: string,
    { workspaceId, authToken }: HeaderCredentials,
  ): Promise<void> {
    await this.workOrderRepository.deleteById(id, workspaceId);

    this.gateway.sendMessage(
      SocketMessages.WORK_ORDER_DELETED,
      workspaceId,
      { workOrderIds: [id], workspaceId },
      {
        ignore: [authToken],
      },
    );
  }

  private toDto(result: WorkOrder): WorkOrderDocumentDto {
    return {
      docId: result.id,
      docType: 'workOrder',
      data: {
        name: result.name,
        description: result.description,
        workCenterId: result.work_center_id,
        status: result.status as WorkOrderStatus,
        startDate: result.start_date,
        endDate: result.end_date,
      },
    };
  }
}
