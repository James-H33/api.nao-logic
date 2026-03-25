import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';
import { UserDto } from 'src/types/dto/user.dto';

@Injectable()
export class UsersService {
  /**
   * create(name: string, email: string, workspaceId: string)
   * getOne(id: string)
   * getUserWorkspace(id: string)
   */

  constructor(private readonly userRepo: UserRepository) {}

  async getAll(): Promise<UserDto[]> {
    const results = await this.userRepo.getAll();

    console.log(results);

    return results.map((result) => ({
      id: result.id,
      name: result.name,
      email: result.email,
    }));
  }

  async getOne(id: string): Promise<UserDto | null> {
    const result = await this.userRepo.getOne(id);

    if (!result) {
      return null;
    }

    return {
      id: result.id,
      name: result.name,
      email: result.email,
    };
  }

  async getUserWorkspace(id: string) {
    const result = await this.userRepo.getOne(id);

    if (!result) {
      return null;
    }

    return {
      workspaceId: result.workspace_id,
    };
  }

  async create(user: {
    name: string;
    email: string;
    workspaceId: string;
  }): Promise<void> {
    const id = crypto.randomUUID();

    await this.userRepo.create({
      id,
      ...user,
    });
  }
}
