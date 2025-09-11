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
  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}
