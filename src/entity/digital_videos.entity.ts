import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('digital_videos')
export class DigitalVideos {
  @PrimaryGeneratedColumn()
id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'text' })
  image: string;

  @Column({ type: 'text' })
  video_url: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}
