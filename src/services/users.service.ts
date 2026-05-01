import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';
import { AuthenticatedDto } from 'src/types/dto/authenticated.dto';
import { UserDto } from 'src/types/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  async login(body: {
    username: string;
    password: string;
  }): Promise<AuthenticatedDto> {
    const result = await this.userRepo.getOne(body.username);

    if (!result) {
      throw new Error('Invalid username or password');
    }

    return {
      authToken: result?.email,
      workspaceId: result?.workspace_id || null,
    };
  }

  async getAll(): Promise<UserDto[]> {
    const results = await this.userRepo.getAll();

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
