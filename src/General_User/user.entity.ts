import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { MessageEntity } from "./message.entity";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    fullName: string;

    @Column({ type: 'bigint', unsigned: true })
    phone: string;

    @Column({ nullable: true }) 
    profilePicture: string;

    @Column({ default: 'General User' }) 
    role: string;

    @OneToMany(() => MessageEntity, message => message.user)
    messages: MessageEntity[];
}
