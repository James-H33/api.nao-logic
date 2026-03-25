import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { WorkCentersService } from 'src/services/work-centers.service';

@Controller('work-centers')
export class WorkCentersController {
  constructor(private readonly workCentersService: WorkCentersService) {}

  @Get()
  async getAll() {
    return this.workCentersService.getAll();
  }

  @Post()
  async create(@Body() body: { name: string; workspaceId: string }) {
    await this.workCentersService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.workCentersService.delete(id);
  }
}
