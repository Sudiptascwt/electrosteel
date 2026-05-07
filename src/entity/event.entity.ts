// src/entity/event.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  category: string; 

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'varchar', length:255, nullable: true })
  slug: string;

  @Column({ type: 'text', nullable: true})
  date: string;

  @Column({ type: 'text', nullable: true })
  time: string;

  @Column({ type: 'text', nullable: true })
  location: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'text', nullable: true })
  files: string;

  @Column({ type: 'text', nullable: true })
  video: string;

  @Column({ type: 'text', nullable: true })
  bannerTitle: string;

  @Column({ type: 'text', nullable: true })
  bannerImage: string;

  @Column({ type: 'text', nullable: true })
  link: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  isLatest: boolean; // For latest events section

  @Column({ type: 'boolean', default: false })
  isUpcoming: boolean; // For upcoming events section

  @Column({ type: 'boolean', default: false })
  isHandpicked: boolean; // For hand-picked videos

  @Column({ type: 'int', default: 0 })
  order: number; // For sorting

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}