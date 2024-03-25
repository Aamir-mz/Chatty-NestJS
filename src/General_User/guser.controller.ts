import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors, Put } from '@nestjs/common';
import { UserService } from './guser.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/createguser.dto';
import { UpdateUserpasswordDto } from './updateuser.dto';
import { UpdateUserPhoneDto } from './updateuser.dto';
import { UpdateUseremailDto } from './updateuser.dto';
import { UpdateUserfnameDto } from './updateuser.dto';
import { UpdateUsernameDto } from './updateuser.dto';
import { JwtAuthGuard } from '../auth/jwt.auth-guard';
import { UserEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserModule } from './guser.module';




@Controller('user')
export class UserController {
    UserService: any;
    constructor(private readonly buserService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.buserService.createUser(createUserDto);
    }

   
    @Post(':id/profile-picture')
    @UseInterceptors(FileInterceptor('file'))
    async addProfilePicture(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        return this.buserService.addProfilePicture(id, file);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/phone')
    async updateUserPhone(@Param('id') id: string, @Body() updateUserPhoneDto: UpdateUserPhoneDto) {
        await this.buserService.updateUserPhone(id, updateUserPhoneDto);
        return { message: 'User phone updated successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/password')
    async updateUserPassword(@Param('id') id: string, @Body() updateUserPasswordDto: UpdateUserpasswordDto) {
        await this.buserService.updateUserPassword(id, updateUserPasswordDto);
        return { message: 'User password updated successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/email')
    async updateUseremail(@Param('id') id: string, @Body() updateUseremailDto: UpdateUseremailDto) {
        await this.buserService.updateUseremail(id, updateUseremailDto);
        return { message: 'User email updated successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/name')
    async updateUsername(@Param('id') id: string, @Body() updateUsernameDto: UpdateUsernameDto) {
        await this.buserService.updateUsername(id, updateUsernameDto);
        return { message: 'User name updated successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/fname')
    async updateUserfname(@Param('id') id: string, @Body() updateUserfnameDto: UpdateUserfnameDto) {
        await this.buserService.updateUserfname(id, updateUserfnameDto);
        return { message: 'User updated successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':name')
async removeUserByName(@Param('name') name: string) {
    await this.buserService.removeUserByName(name);
    return { message: 'User removed successfully' };
}



}
