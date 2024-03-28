import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../buser/local.strategy';
import { JwtStrategy } from '../buser/jwt.strategy';
import { AuthController } from './auth.controller';
import { BuserModule } from '../buser/buser.module';

@Module({
  imports: [
    forwardRef(() => BuserModule), 
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [AuthService,LocalStrategy, JwtStrategy],
  controllers: [AuthController],

})
export class AuthModule {}
