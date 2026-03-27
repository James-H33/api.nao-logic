import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorkspaceId } from 'src/common/decorators/workspace-id.decorator';
import { ViewsService } from 'src/services/views.service';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Get('/view/:id')
  async getViewById(
    @WorkspaceId() workspaceId: string,
    @Param('id') id: string,
  ) {
    console.log('Workspace ID from header:', workspaceId);

    return this.viewsService.getViewById(id);
  }

  @Get('/workspace')
  async getViewsByWorkspaceId(@WorkspaceId() workspaceId: string) {
    console.log('Workspace ID from header:', workspaceId);
    return this.viewsService.getViewsByWorkspaceId(workspaceId);
  }

  @Post()
  async createView(
    @WorkspaceId() workspaceId: string,
    @Body() body: { name: string },
  ) {
    return this.viewsService.createView(body.name, workspaceId);
  }
}
