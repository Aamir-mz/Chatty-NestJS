import { Controller, Post, UseGuards, Request, Body, UnauthorizedException, BadRequestException, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../buser/local-auth.guard';
//import { Request as ExpressRequest } from 'express';
import { LoginUserDto } from './login-user.dto';
import { JwtAuthGuard } from 'src/buser/jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginUserDto: LoginUserDto) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('forgot-password')
    async forgotPassword(@Body('email') email: string): Promise<void> {
        const resetUrl = 'http://localhost:4000/auth/reset-password';
 
        const token = await this.authService.generateResetToken(email);
        await this.authService.sendForgotPasswordEmail(email, `${resetUrl}?token=${token}`);
    }

   
    @Post('reset-password')
    async resetPassword(@Body() resetData: { token: string, newPassword: string }): Promise<{ success: true, message: string }> {
    try {
       await this.authService.resetPassword(resetData.token, resetData.newPassword);
       return { success: true, message: 'Password reset successfully' };
    } catch (error) {
    throw new BadRequestException(error.message);
    }
}

@Post('logout')
    async logout(@Body('token') token: string): Promise<string> {
        try {
            if (this.authService.isTokenInvalidated(token)) {
                throw new UnauthorizedException('Token has already been invalidated');
            }
            return await this.authService.logout(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }





    
    


  
}

