import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  currentPassword: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/, {
    message: 'New password must be at least 6 characters long, include at least one uppercase character, one number, and one special character.',
  })
  newPassword: string;
}
