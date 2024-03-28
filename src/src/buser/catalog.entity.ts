import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { BuserEntity } from './buser.entity'; 
import { Item } from './item.entity'; 

@Entity()
export class Catalog {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => BuserEntity, (buserEntity) => buserEntity.catalog) 
  buser: BuserEntity;

  @OneToMany(() => Item, (item) => item.catalog, { cascade: true })
  items: Item[];
}
