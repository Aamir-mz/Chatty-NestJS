import { IsNotEmpty, IsEmail, Matches, MinLength, MaxLength, IsString, IsNumberString, Length   } from 'class-validator';

export class UpdateUserPhoneDto {
   
    @IsString()
    @Matches(/^01\d{9}$/, { message: 'Phone number must be 11 digits and start with 01' })
    @Length(11, 11, { message: 'Phone number must contain exactly 11 digits' }) // Custom message for length validation
    phone: string;
}

export class UpdateUsernameDto {
    @IsString()
    @Matches(/^[A-Za-z]+$/, {
        message: 'name must only contain alphabets',
    })
    @MinLength(4, {
        message: 'name must be at least 4 characters',
    })
    @MaxLength(20, {
        message: 'name must not be longer than 20 characters',
    })
    name: string;
}

export class UpdateUseremailDto {
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
}

export class UpdateUserpasswordDto {
@Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/, {
    message: 'password must be at least 6 characters long and include at least one uppercase character, one number, and one special character',
})
password: string;
}
export class UpdateUserfnameDto {
    @IsString()
    @Matches(/^[A-Za-z]+$/, {
        message: 'fullName must only contain alphabets',
    })
    fullName: string;
    }




