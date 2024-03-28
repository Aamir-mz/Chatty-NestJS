import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BuserEntity } from './buser.entity';
import { CreateUserDto } from './create-user.dto';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateUserDto } from './update-user.dto';
import { CreateItemDto } from './create-item.dto';
import { Item } from './item.entity';
import { Catalog } from './catalog.entity';

 

@Injectable()
export class BuserService {
    save(user: BuserEntity) {
        throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(BuserEntity)
        private buserRepository: Repository<BuserEntity>,
        @InjectRepository(Item)
        private itemRepository: Repository<Item>, 
        /*@InjectRepository(Message)
        private messageRepository: Repository<Message>,*/
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<BuserEntity> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // 10 is the salt round
        const user = this.buserRepository.create({
          ...createUserDto,
          password: hashedPassword,
        });
        const catalog = new Catalog();
        user.catalog = catalog;
        return this.buserRepository.save(user);
      }
    
      async findOneByEmail(email: string): Promise<BuserEntity | undefined> {
        return this.buserRepository.findOneBy({ email });
      }

    async addProfilePicture(id: string, file: Express.Multer.File): Promise<any> {
        const user = await this.buserRepository.findOneBy({ id: parseInt(id) });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const uploadsDir = path.resolve('/Users/neshatafrin/Downloads/uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        if (user.profilePicture && fs.existsSync(user.profilePicture)) {
            fs.unlinkSync(user.profilePicture);
        }

        const fileName = `profile_${user.id}_${Date.now()}${path.extname(file.originalname)}`;
        const filePath = path.join(uploadsDir, fileName);
        fs.writeFileSync(filePath, file.buffer);

        user.profilePicture = filePath;
        await this.buserRepository.save(user);

        return { message: 'Profile picture added successfully', filePath };
    }

    async updateUser(email: string, updateUserDto: UpdateUserDto): Promise<BuserEntity> {
        const user = await this.buserRepository.findOneBy({ email });
    
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        Object.assign(user, updateUserDto);
    
        return this.buserRepository.save(user);
      }



      async deleteUserByEmail(email: string): Promise<void> {
        const result = await this.buserRepository.delete({ email });
    
        if (result.affected === 0) {
          throw new NotFoundException(`User with email ${email} not found`);
        }
      }

      

      async changePassword(email: string, currentPassword: string, newPassword: string): Promise<any> {
        const user = await this.buserRepository.findOneBy({ email });
      
        if (!user) {
          throw new NotFoundException('User not found');
        }
      
        const passwordValid = await bcrypt.compare(currentPassword, user.password);
      
        if (!passwordValid) {
          throw new UnauthorizedException('Current password is incorrect');
        }
      
        user.password = await bcrypt.hash(newPassword, 10);
        await this.buserRepository.save(user);
      
        return { message: 'Password updated successfully' };
      }

      async addItemToCatalog(email: string, createItemDto: CreateItemDto): Promise<Item> {
        const user = await this.buserRepository.findOne({
            where: { email: email },
            relations: ['catalog'],
        });
    
        if (!user || !user.catalog) {
            throw new Error('User or user catalog not found');
        }
    
        const item = new Item();
        Object.assign(item, createItemDto);
        item.catalog = user.catalog;
    
        return await this.itemRepository.save(item); 
    }

    async deleteItemFromCatalog(email: string, itemId: number): Promise<void> {
      const itemToRemove = await this.itemRepository.findOne({
          where: { id: itemId },
          relations: ['catalog', 'catalog.buser'],
      });
  
      if (!itemToRemove) {
          throw new Error('Item not found');
      }
  
      if (itemToRemove.catalog.buser.email !== email) {
          throw new Error('Unauthorized: This item does not belong to the user');
      }
  
      await this.itemRepository.remove(itemToRemove);
  }



  async getItemsByCatalogForUser(email: string, catalogId: number): Promise<Item[]> {
    const user = await this.buserRepository.findOne({
        where: { email: email },
        relations: ['catalog'],
    });

    if (!user || !user.catalog || user.catalog.id !== catalogId) {
        throw new Error('User catalog not found or mismatch');
    }

    return this.itemRepository.find({
        where: {
            catalog: { id: catalogId },
        },
    });
}



  

  
    
    


    

}
