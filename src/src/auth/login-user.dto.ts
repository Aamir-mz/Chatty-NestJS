import { IsNotEmpty } from "class-validator";
export class LoginUserDto {
    @IsNotEmpty({message:"Should Not Empty"})
    email: string;

    @IsNotEmpty({message:"Should Not Empty"})
    password: string;
}

