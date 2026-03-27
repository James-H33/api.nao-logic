import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { WorkspaceId } from 'src/common/decorators/workspace-id.decorator';
import { WorkCentersService } from 'src/services/work-centers.service';

@Controller('work-centers')
export class WorkCentersController {
  constructor(private readonly workCentersService: WorkCentersService) {}

  @Get()
  async getAll() {
    return this.workCentersService.getAll();
  }

  @Post()
  async create(
    @WorkspaceId() workspaceId: string,
    @Body() body: { name: string },
  ) {
    return await this.workCentersService.create({
      ...body,
      workspaceId,
    });
  }

  @Post('/bulk')
  async getBulk(
    @WorkspaceId() workspaceId: string,
    @Body() body: { ids: string[] },
  ) {
    return this.workCentersService.getBulk({
      ...body,
      workspaceId,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.workCentersService.delete(id);
  }
}
