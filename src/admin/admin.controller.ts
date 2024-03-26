import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('/admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

  @Get()
  getUsers(): object {
    return this.adminService.getUsers();
  }
  @Get('users/:id')
  getUsersById(@Param('id') id: string): object {
    return this.adminService.getUsersById(id);
  }
  @Get ('users/')
  getUsersByNameAndID(@Query('name') name: string, @Query('id') id:string) :object {
    return this.adminService.getUsersByNameAndID(name, id);
  }
  @Post('adduser')
  addUser(@Body()myobj: object):object{
    return this.adminService.addUser(myobj);
  }
  @Put('updateuser/')
  updateUser(@Body()myobj: object):object{
    return this.adminService.addUser(myobj);
}
}