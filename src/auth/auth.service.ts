import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../General_User/guser.service';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../General_User/user.entity';

@Injectable()
export class AuthService {
    buserRepository: any;
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private readonly mailerService: MailerService
    ) {}
    private readonly resetTokens: Map<string, string> = new Map(); // Map to store reset tokens and associated emails
    private readonly passwords: Map<string, string> = new Map();

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async logout(token: string): Promise<string> {
        try {
          // Verify the token to ensure it's valid
          const decodedToken = this.jwtService.verify(token);
    
          // Invalidate the token by setting its expiration time to a past date
          const expiredToken = this.jwtService.sign({}, { expiresIn: 0 });
    
          // Return a message indicating successful logout
          return `User ${decodedToken.sub} logged out successfully`;
        } catch (error) {
          // Handle token verification errors
          throw new UnauthorizedException('Invalid token');
        }
      }

    
      async sendForgotPasswordEmail(email: string, resetUrl: string): Promise<void> {
        const token = await this.generateResetToken(email); // Generate token
        const resetLink = `${resetUrl}`;
   
        await this.mailerService.sendMail({
            to: email,
            subject: 'Reset Your Password',
            text: `Please click on the following link to reset your password: ${resetLink}`,
        });
    }
   
    async generateResetToken(email: string): Promise<string> {
        const token = Math.random().toString(36).substr(2); // Generate random token
        this.resetTokens.set(token, email); // Associate token with email
        return token;
    }
   
 
    // Method to validate a reset token
    async validateResetToken(token: string): Promise<boolean> {
        return this.resetTokens.has(token); // Check if token exists in the map
    }
 
    // Method to reset password using a valid token
    async resetPassword(token: string, newPassword: string): Promise<string> {
        // Validate the reset token
        const isValidToken = await this.validateResetToken(token);
        if (!isValidToken) {
            throw new UnauthorizedException('Invalid or expired reset token');
        }
    
        const email = this.resetTokens.get(token); // Get email associated with token
        if (!email) {
            throw new NotFoundException('Token not found');
        }
    
        // Update password
        this.passwords.set(email, newPassword);
    
        // Delete token from resetTokens map
        this.resetTokens.delete(token);
    
        // Generate a new JWT token with updated credentials
        const jwtToken = this.generateJwtToken(email);
    
        if (!jwtToken) {
            throw new UnauthorizedException('Failed to generate JWT token after password reset');
        }
    
        // Return the new JWT token
        return jwtToken;
    }
 
    private generateJwtToken(email: string): string {
        // Generate a new JWT token with updated claims (if needed)
        const payload = { email }; // Example payload, customize as needed
        return this.jwtService.sign(payload);
    }
 
    // Method to get password associated with an email (for example, during login)
    async getPasswordByEmail(email: string): Promise<string | undefined> {
        return this.passwords.get(email); // Get password from the passwords map
    }
}

