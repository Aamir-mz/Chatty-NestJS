import { Controller, Post, UseGuards, Request, UnauthorizedException, Body, BadRequestException, Patch, Param, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../General_User/local-auth.guard';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from './jwt.auth-guard';
import { ResetPasswordDto } from '../General_User/dto/resetpassword.dto';


interface AuthenticatedRequest extends ExpressRequest {
    user?: any; // Adjust the type according to your authentication strategy
}

@Controller('auth')
export class AuthController {
  buserService: any;
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }
  @Post('logout')
  async logout(@Body('token') token: string): Promise<string> {
    try {
      // Call the logout method in the AuthService
      return await this.authService.logout(token);
    } catch (error) {
      // Handle any errors, such as invalid token
      throw new UnauthorizedException('Invalid token');
    }
  }
 
  @Post('forgot-password')
    async forgotPassword(@Body('email') email: string): Promise<void> {
        
        const resetUrl = 'http://localhost:4000/auth/reset-password';
 
        
        const token = await this.authService.generateResetToken(email);
        await this.authService.sendForgotPasswordEmail(email, `${resetUrl}`);
    }
    @Post('reset-password')
    async resetPassword(@Body() resetData: { token: string, newPassword: string }) {
        try {
           
            await this.authService.resetPassword(resetData.token, resetData.newPassword);
            return { message: 'Password reset successfully' };
        } catch (error) {
            throw new BadRequestException('Failed to reset password');
        }

}
}
