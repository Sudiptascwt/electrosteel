import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('overview')
export class Overview {
@PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'image_url', type: 'text' })
  image_url: string;  // Changed from imageUrl to image_url

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;  // Changed from createdAt to created_at

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;  // Changed from updatedAt to updated_at
}