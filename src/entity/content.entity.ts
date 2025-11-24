import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Event } from './event.entity';

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'int' })
  event_id: number;

  //Relation with Event table
  @ManyToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  date: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'longtext' })
  image: string;

  @Column({ type: 'bigint', nullable: true })
  image_id: number;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: 0 | 1; 

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}
