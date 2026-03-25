import { Module } from '@nestjs/common';
import { WorkOrdersController } from './work-orders.controller';
import { ServicesModule } from 'src/services/services.module';

@Module({
  controllers: [WorkOrdersController],
  imports: [ServicesModule],
})
export class WorkOrdersModule {}
