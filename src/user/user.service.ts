import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return this.usersRepository.save(newUser);
  }
}
