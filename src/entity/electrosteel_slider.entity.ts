import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('electrosteel_slider')
export class ElectrosteelSlider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  title: string;

  @Column({ type: 'longtext' })
  subtitle1: string;

  @Column({ type: 'longtext' })
  subtitle2: string;

  @Column({ type: 'text' })
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
