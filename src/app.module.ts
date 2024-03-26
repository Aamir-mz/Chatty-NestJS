import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './General_User/guser.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserEntity } from './General_User/user.entity'; // Import UserEntity
import { MessageEntity } from './General_User/message.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([UserEntity, MessageEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'ChatApp',
      autoLoadEntities: true,
      synchronize: true,
      entities: [UserEntity, MessageEntity], // Add UserEntity to entities array
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'chatapp621@gmail.com',
          pass: 'mlbm hbwe dlqn pnez',
        },
      },
      defaults: {
        from: 'ChatApp <chatapp405@gmail.com>',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
