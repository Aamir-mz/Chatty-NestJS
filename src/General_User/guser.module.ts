import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './guser.controller';
import { UserService } from './guser.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
    //forwardRef(() => AuthModule), // Add this if BuserModule depends on AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Ensure BuserService is exported for use in AuthModule
})
export class UserModule {}
