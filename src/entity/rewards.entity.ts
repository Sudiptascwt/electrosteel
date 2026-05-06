import { text } from 'stream/consumers';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
// entity/reward.entity.ts
@Entity('rewards')
export class Reward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  pragatiData: string;

  @Column({ type: 'text', nullable: true })
  pratihbaImages: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}