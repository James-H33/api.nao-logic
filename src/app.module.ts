import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoryModule } from './repository/repository.module';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './controllers/users/users.module';
import { ViewsModule } from './controllers/views/views.module';
import { WorkCentersModule } from './controllers/work-centers/work-centers.module';
import { WorkOrdersModule } from './controllers/work-orders/work-orders.module';
import { WorkspacesModule } from './controllers/workspaces/workspaces.module';

@Module({
  imports: [
    RepositoryModule,
    ServicesModule,
    WorkCentersModule,
    WorkOrdersModule,
    ViewsModule,
    UsersModule,
    WorkspacesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly appService: AppService) {
    this.appService.initDatabase();
  }
}
