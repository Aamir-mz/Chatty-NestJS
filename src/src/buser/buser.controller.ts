import { Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, Req, Res, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express'; 
import { BuserService } from './buser.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ChangePasswordDto } from './change-password.dto';
import { CreateItemDto } from './create-item.dto';
import { Item } from './item.entity';
//import { Message } from './message.entity';



@Controller('buser')
export class BuserController {
    constructor(private readonly buserService: BuserService) {}

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
    @Put('edit-profile')
    async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
      const email = req.user.email; 
      const user = await this.buserService.findOneByEmail(email);

      if (!user) {
          throw new NotFoundException('User not found');
      }

      if (user.email !== email) {
           throw new ForbiddenException('You can only edit your own profile');
      }

      return this.buserService.updateUser(email, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
      @Get('view-profile')
      async viewProfile(@Req() req) {
        const email = req.user.email; 
        const user = await this.buserService.findOneByEmail(email);
    
        if (!user) {
          throw new NotFoundException('User not found');
        }
        if (user.email !== email) {
            throw new ForbiddenException('You can only see your own profile');
       }
        
        return user; 
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete-profile')
    async deleteProfile(@Req() req, @Res() res: Response) {
        await this.buserService.deleteUserByEmail(req.user.email);
        return res.status(200).json({ message: 'Profile deleted successfully' }); 
    }



    @UseGuards(JwtAuthGuard)
    @Patch('change-password')
    async changePassword(@Req() req, @Body() changePasswordDto: ChangePasswordDto) {
        if (req.user.email !== changePasswordDto.email) {
             throw new UnauthorizedException('Authenticated email does not match request email');
        }
  
        return this.buserService.changePassword(changePasswordDto.email, changePasswordDto.currentPassword, changePasswordDto.newPassword);
    }

    @UseGuards(JwtAuthGuard)
    @Post('item')
    async addItemToCatalog(@Req() req, @Body() createItemDto: CreateItemDto) {
        return this.buserService.addItemToCatalog(req.user.email, createItemDto);
    }

    @UseGuards(JwtAuthGuard)
@Delete('item/:itemId')
async deleteItem(
    @Req() req,
    @Param('itemId', ParseIntPipe) itemId: number
): Promise<{ message: string }> { 
    await this.buserService.deleteItemFromCatalog(req.user.email, itemId);
    return { message: 'Item deleted' };
}



@UseGuards(JwtAuthGuard)
@Get('catalog/:catalogId/items')
async getItemsByCatalog(
    @Req() req,
    @Param('catalogId', ParseIntPipe) catalogId: number
): Promise<Item[]> {
    return this.buserService.getItemsByCatalogForUser(req.user.email, catalogId);
}




 

    

    
    
}
