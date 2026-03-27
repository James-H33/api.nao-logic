import { Module } from '@nestjs/common';
import { ViewsController } from './views.controller';
import { ServicesModule } from 'src/services/services.module';

@Module({
  controllers: [ViewsController],
  imports: [ServicesModule],
})
export class ViewsModule {}
