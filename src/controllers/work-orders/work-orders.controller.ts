import { Body, Controller, Get, Post } from '@nestjs/common';
import { WorkspaceId } from 'src/common/decorators/workspace-id.decorator';
import { WorkOrdersService } from 'src/services/work-orders.service';
import type { CreateWorkOrderDto } from 'src/types/dto/create-work-order.dto';

@Controller('work-orders')
export class WorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}

  @Get()
  async getAll() {
    return this.workOrdersService.getAll();
  }

  @Post('/bulk')
  async getBulk(
    @WorkspaceId() workspaceId: string,
    @Body() body: { ids: string[] },
  ) {
    return this.workOrdersService.getBulk({
      ...body,
      workspaceId,
    });
  }

  @Post()
  async create(
    @WorkspaceId() workspaceId: string,
    @Body() body: CreateWorkOrderDto,
  ) {
    return await this.workOrdersService.create({
      ...body,
      workspaceId,
    });
  }
}
