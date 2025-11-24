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

  @Column({ type: 'bigint', nullable: true })
  image_id: number;

  @Column({ type: 'longtext' })
  description: string;

  @Column({
  type: 'tinyint',
  width: 1,
  default: 1, // 1 = Active, 0 = Inactive
  })
  status: number;
  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}
