import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { DatabaseService } from './database';
import { WorkCenterRepository } from './work-center.repository';
import { WorkOrderRepository } from './work-order.repository';
import { WorkspaceRepository } from './workspace.repository';
import { ViewsRepository } from './views.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    DatabaseService,
    UserRepository,
    WorkCenterRepository,
    WorkOrderRepository,
    WorkspaceRepository,
    ViewsRepository,
  ],
  exports: [
    DatabaseService,
    UserRepository,
    WorkCenterRepository,
    WorkOrderRepository,
    WorkspaceRepository,
    ViewsRepository,
  ],
})
export class RepositoryModule {}
