import { Module } from '@nestjs/common';
import { WorkCentersController } from './work-centers.controller';
import { ServicesModule } from 'src/services/services.module';

@Module({
  controllers: [WorkCentersController],
  imports: [ServicesModule],
})
export class WorkCentersModule {}
