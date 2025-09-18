import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('social_sections') 
export class SocialSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  page_id: number;

  @Column()
  title: string;

  @Column({ type:'longtext', nullable: true })
  year: string;

  @Column({ type:'longtext',nullable: true })
  description: string;

  @Column({ type:'longtext',nullable: true })
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
