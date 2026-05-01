import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../../services/users.service';
import { AuthenticatedDto } from 'src/types/dto/authenticated.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
  ): Promise<AuthenticatedDto> {
    return await this.userService.login(body);
  }
}
