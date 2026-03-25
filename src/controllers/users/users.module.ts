import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ServicesModule } from 'src/services/services.module';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  controllers: [UsersController],
  imports: [ServicesModule, RepositoryModule],
})
export class UsersModule {}
