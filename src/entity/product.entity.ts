import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products') 
export class Product {
  @PrimaryGeneratedColumn()
id: number;

  @Column()
  page_id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
