import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { UsersService } from './users.service';
import { WorkCentersService } from './work-centers.service';
import { WorkOrdersService } from './work-orders.service';
import { WorkSpacesService } from './workspaces.service';

@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers: [
    UsersService,
    WorkSpacesService,
    WorkCentersService,
    WorkOrdersService,
  ],
  exports: [
    UsersService,
    WorkSpacesService,
    WorkCentersService,
    WorkOrdersService,
  ],
})
export class ServicesModule {}
