import { Body, Controller, Get, Post } from '@nestjs/common';
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
  async getBulk(@Body() body: { ids: string[]; workspaceId: string }) {
    return this.workOrdersService.getBulk(body);
  }

  @Post()
  async create(
    @Body()
    body: CreateWorkOrderDto,
  ) {
    await this.workOrdersService.create(body);
  }
}
