import { IsString, IsEmail, IsIn, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsString()
  @IsIn(['admin', 'general', 'business'])
  role: string;
}
