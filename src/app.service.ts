import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDto } from './message.dto'; 
import { MessageEntity } from './General_User/message.entity'; 

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async getMessages(): Promise<MessageEntity[]> {
    return this.messageRepository.find({ relations: ['user'] }); 
  }

  async sendMessage(messageDto: MessageDto): Promise<MessageEntity> {
    const message = this.messageRepository.create(messageDto);
    return this.messageRepository.save(message);
  }
}
