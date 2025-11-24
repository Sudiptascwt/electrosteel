import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('about_facility')
export class AboutFacility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  meta_key: string;

  @Column({ type: 'longtext', nullable: true })
  meta_value: string;

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