import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('below_banner')
export class BelowBanner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext'})
  title: string;

  @Column({ type: 'longtext', nullable: true })  
  description: string;

  @Column({ type: 'text', nullable: true })
  video: string;

  @Column({ type: 'bigint', nullable: true })
  video_id: number;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: 0 | 1; 

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
