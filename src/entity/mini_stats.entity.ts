import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('mini_stats')
export class mini_stats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  cardImage: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cardImageAlt: string;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  statsCount: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}