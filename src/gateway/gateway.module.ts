import { Module } from '@nestjs/common';
import { Gateway } from 'src/gateway/gateway.socket';

@Module({
  imports: [],
  controllers: [],
  providers: [Gateway],
  exports: [Gateway],
})
export class GatewayModule {}
