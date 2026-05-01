import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { ServicesModule } from 'src/services/services.module';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [ServicesModule, RepositoryModule],
})
export class AuthModule {}
