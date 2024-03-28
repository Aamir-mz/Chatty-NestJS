import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuserModule } from './buser/buser.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [BuserModule,AuthModule,TypeOrmModule.forRoot(
   {type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'neshat',
    database: 'Neshat',
    autoLoadEntities: true,
    synchronize: true,
   }

  ),
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
