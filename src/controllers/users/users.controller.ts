import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDto } from 'src/types/dto/user.dto';
import { UsersService } from '../../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto | null> {
    return this.userService.getOne(id);
  }

  @Get(':id/workspace')
  async getUserWorkspace(@Param('id') id: string) {
    return this.userService.getUserWorkspace(id);
  }

  @Post()
  async create(
    @Body() body: { name: string; email: string; workspaceId: string },
  ): Promise<void> {
    await this.userService.create(body);
  }
}
