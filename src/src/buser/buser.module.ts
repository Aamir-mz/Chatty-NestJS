import { forwardRef, Module } from '@nestjs/common';
import { BuserController } from './buser.controller';
import { BuserService } from './buser.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuserEntity } from './buser.entity';
import { Catalog } from './catalog.entity';
import { Item } from './item.entity';
//import { Message } from './message.entity';

//import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([BuserEntity,Catalog, Item]),
    //forwardRef(() => AuthModule)
  ],
  controllers: [BuserController],
  providers: [BuserService],
  exports: [BuserService], 
})
export class BuserModule {}
