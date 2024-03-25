import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../General_User/local.strategy';
import { JwtStrategy } from '../General_User/jwt.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../General_User/guser.module';

@Module({
  imports: [
    forwardRef(() => UserModule), // Use forwardRef here
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  
})
export class AuthModule {}
