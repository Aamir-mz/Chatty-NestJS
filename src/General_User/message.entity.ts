import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("message")
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => UserEntity, user => user.messages)
    user: UserEntity;
}
