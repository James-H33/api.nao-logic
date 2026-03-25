import { Injectable } from '@nestjs/common';
import { DatabaseService } from './repository/database';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  initDatabase(): void {
    this.databaseService
      .init()
      .then(() => {
        console.log('Database initialized successfully.');
      })
      .catch((error) => {
        console.error('Error initializing database:', error);
      });
  }
}
