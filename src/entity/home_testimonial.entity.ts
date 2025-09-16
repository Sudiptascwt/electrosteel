// src/entity/testimonial.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('home_testimonial')
export class Testimonial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  main_title: string;

  @Column({ type: 'text' })
  date: string;

  @Column({ type: 'text' })
  sub_title: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
