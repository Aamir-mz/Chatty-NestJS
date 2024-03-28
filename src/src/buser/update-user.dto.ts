import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    fullName?: string;

    @IsOptional()
    @IsNumberString({}, { message: 'phone must be a numeric string' })
    @MaxLength(11, { message: 'Phone number must not be longer than 11 digits' })
    phone?: string; 

    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    email?: string;

    @IsOptional()
    @IsString()
    businessCategory?: string;
}
