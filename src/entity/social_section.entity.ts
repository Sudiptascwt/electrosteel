import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('social_sections') 
export class SocialSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  page_id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  year: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
