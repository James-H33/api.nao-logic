import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { DatabaseService } from './database';
import { WorkCenterRepository } from './work-center.repository';
import { WorkOrderRepository } from './work-order.repository';
import { WorkspaceRepository } from './workspace.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    DatabaseService,
    UserRepository,
    WorkCenterRepository,
    WorkOrderRepository,
    WorkspaceRepository,
  ],
  exports: [
    DatabaseService,
    UserRepository,
    WorkCenterRepository,
    WorkOrderRepository,
    WorkspaceRepository,
  ],
})
export class RepositoryModule {}
