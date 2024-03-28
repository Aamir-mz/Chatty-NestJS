import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Catalog } from './catalog.entity'; 

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('')
  priceBDT: number;

  @Column()
  description: string;

  @Column()
  itemCode: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => Catalog, (catalog) => catalog.items)
  catalog: Catalog;

}
