import { Injectable } from '@nestjs/common';
import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { join } from 'path';

@Injectable()
export class DatabaseService {
  private db: Database;

  async init(): Promise<Database> {
    const driver = sqlite3.Database;
    const path = join(__dirname, '../..', 'database.db');

    console.log('Path: ', path);

    this.db = await open({
      filename: path,
      driver: driver,
    });

    await this.createWorkspaceTable();
    await this.createTables();
    // await this.createDummyData();
    // await this.queryDummyData();

    return this.db;
  }

  createWorkspaceTable(): Promise<void> {
    return this.db.exec(`
      CREATE TABLE IF NOT EXISTS workspaces (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      );
      `);
  }

  createTables(): Promise<void> {
    console.log('Creating tables if they do not exist...');

    return this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        workspace_id TEXT NOT NULL,
        FOREIGN KEY (workspace_id) REFERENCES workspaces(id)
      );

      CREATE TABLE IF NOT EXISTS work_centers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        workspace_id TEXT NOT NULL,
        FOREIGN KEY (workspace_id) REFERENCES workspaces(id)
      );

      CREATE TABLE IF NOT EXISTS work_orders (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        start_date TEXT,
        end_date TEXT,
        status TEXT,
        workspace_id TEXT NOT NULL,
        work_center_id TEXT NOT NULL,
        FOREIGN KEY (workspace_id) REFERENCES workspaces(id),
        FOREIGN KEY (work_center_id) REFERENCES work_centers(id)
      );
    `);
  }

  createDummyData(): Promise<void> {
    console.log('Inserting dummy data...');

    return this.db.exec(`
      INSERT INTO workspaces (id, name) VALUES ('workspace-1', 'Workspace 1');
      INSERT INTO work_centers (id, name, workspace_id) VALUES ('workcenter-1', 'Work Center 1', 'workspace-1');
      INSERT INTO users (id, name, email, workspace_id) VALUES ('user-1', 'User 1', 'user1@example.com', 'workspace-1');
      INSERT INTO work_orders (id, work_center_id, name, description, start_date, end_date, status, workspace_id) VALUES
        ('workorder-1', 'workcenter-1', 'Work Order 1', 'Work Order 1 Description', '2024-01-01', '2024-01-07', 'open', 'workspace-1');
    `);
  }

  async queryDummyData(): Promise<void> {
    console.log('Querying dummy data...');

    const workspaces = await this.db.all('SELECT * FROM workspaces');
    console.log('Workspaces:', workspaces);

    const workCenters = await this.db.all('SELECT * FROM work_centers');
    console.log('Work Centers:', workCenters);

    const users = await this.db.all('SELECT * FROM users');
    console.log('Users:', users);

    const workOrders = await this.db.all('SELECT * FROM work_orders');
    console.log('Work Orders:', workOrders);
  }

  getDb(): Database {
    if (!this.db) {
      throw new Error('Database not initialized. Call init() first.');
    }
    return this.db;
  }
}
