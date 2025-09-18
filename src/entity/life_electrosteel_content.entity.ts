import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('life_electrosteel_content')
export class LifeElectrosteelContent {
  @PrimaryGeneratedColumn()
id: number;

  @Column({ type: 'longtext' })
  title: string;

  @Column({ type: 'longtext' })
  image: string;

  @Column({ type: 'longtext' })
  description: string;
  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}
