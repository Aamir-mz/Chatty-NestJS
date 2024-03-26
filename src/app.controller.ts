import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDto } from './message.dto';
import { JwtAuthGuard } from './auth/jwt.auth-guard'; 

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('messages')
  async getMessages() {
    return this.appService.getMessages();
  }
  @UseGuards(JwtAuthGuard)
  @Post('messages')
  async sendMessage(@Body() messageDto: MessageDto) {
    return this.appService.sendMessage(messageDto);
  }
}
