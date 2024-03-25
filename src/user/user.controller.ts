import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto) {                                     
    return this.usersService.create(createUserDto);
  }
}
