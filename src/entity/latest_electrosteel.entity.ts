import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('latest_electrosteel')
export class LatestElectrosteel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  page_meta_key: string;

  @Column({ type: 'longtext' })
  page_meta_value: string;
  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}
