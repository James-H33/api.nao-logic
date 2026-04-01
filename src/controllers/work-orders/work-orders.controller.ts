import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { WorkspaceId } from 'src/common/decorators/workspace-id.decorator';
import { WorkOrdersService } from 'src/services/work-orders.service';
import type { CreateWorkOrderDto } from 'src/types/dto/create-work-order.dto';
import type { UpdateWorkOrderDto } from 'src/types/dto/update-work-order.dto';

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
    return this.workOrdersService.getBulk(body.ids, workspaceId);
  }

  @Post()
  async create(
    @WorkspaceId() workspaceId: string,
    @Body() body: CreateWorkOrderDto,
  ) {
    return await this.workOrdersService.create(body, workspaceId);
  }

  @Put()
  async update(
    @WorkspaceId() workspaceId: string,
    @Body() body: UpdateWorkOrderDto,
  ) {
    return await this.workOrdersService.update(body, workspaceId);
  }

  @Delete()
  async delete(
    @WorkspaceId() workspaceId: string,
    @Body() body: { id: string },
  ) {
    return await this.workOrdersService.delete(body.id, workspaceId);
  }
}
