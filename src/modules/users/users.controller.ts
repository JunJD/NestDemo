import { Controller, Get } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('login')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // @Post('login')
}
