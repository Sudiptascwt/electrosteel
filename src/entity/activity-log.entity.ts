import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('activity_logs')
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column()
  action: string;

  @Column({ nullable: true })
  model: string;

  @Column({ type: 'text', nullable: true })
  data: string;

  @Column({ nullable: true })
  ip: string;

  @CreateDateColumn()
  created_at: Date;
}
