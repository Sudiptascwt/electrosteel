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

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}
