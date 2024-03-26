import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createguser.dto';
import { UpdateUserPhoneDto, UpdateUseremailDto, UpdateUserfnameDto, UpdateUsernameDto, UpdateUserpasswordDto } from './updateuser.dto';
import * as fs from 'fs';
import * as path from 'path';
import { UserEntity } from './user.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private buserRepository: Repository<UserEntity>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // 10 is the salt round
        const user = this.buserRepository.create({
          ...createUserDto,
          password: hashedPassword,
        });
        return this.buserRepository.save(user);
      }
    
      // Include a method to find a user by email for authentication
      async findOneByEmail(email: string): Promise<UserEntity | undefined> {
        return this.buserRepository.findOneBy({ email });
      }

      async findOneByName(name: string): Promise<UserEntity | undefined> {
        return this.buserRepository.findOneBy({ name });
      }

    async addProfilePicture(id: string, file: Express.Multer.File): Promise<any> {
        const user = await this.buserRepository.findOneBy({ id: parseInt(id) });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Ensure the uploads directory exists
        const uploadsDir = path.resolve('/Users/Maishara/Downloads/uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Delete the old profile picture if it exists
        if (user.profilePicture && fs.existsSync(user.profilePicture)) {
            fs.unlinkSync(user.profilePicture);
        }

        // Save the new profile picture to disk
        const fileName = `profile_${user.id}_${Date.now()}${path.extname(file.originalname)}`;
        const filePath = path.join(uploadsDir, fileName);
        fs.writeFileSync(filePath, file.buffer);

        // Update the user entity to store the new file path
        user.profilePicture = filePath;
        await this.buserRepository.save(user);

        return { message: 'Profile picture added successfully', filePath };
    }

    async updateUserPhone(id: string, updateUserPhoneDto: UpdateUserPhoneDto): Promise<void> {
        await this.buserRepository.update(id, { phone: updateUserPhoneDto.phone });
    }

    async updateUserPassword(id: string, updateUserPasswordDto: UpdateUserpasswordDto): Promise<void> {
        await this.buserRepository.update(id, { password: updateUserPasswordDto.password });
    }

    async updateUsername(id: string, updateUsernameDto: UpdateUsernameDto): Promise<void> {
        await this.buserRepository.update(id, { name: updateUsernameDto.name });
    }

    async updateUseremail(id: string, updateUseremailDto: UpdateUseremailDto): Promise<void> {
        await this.buserRepository.update(id, { email: updateUseremailDto.email });
    }

    async updateUserfname(id: string, updateUserfnameDto: UpdateUserfnameDto): Promise<void> {
        await this.buserRepository.update(id, { fullName: updateUserfnameDto.fullName });
    }

    async removeUserByName(name: string): Promise<void> {
        const user = await this.buserRepository.findOne({ where: { name } });
    
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        await this.buserRepository.remove(user);
    }

    async findUserById(userId: number): Promise<UserEntity> {
        return this.buserRepository.findOne({ where: { id: userId } });
      }
    
}
