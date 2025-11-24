import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lower_statistics')
export class LowerStatistic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext', nullable: true })  
  pipes_title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pipes_number: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  overview_image: string;

  @Column({ type: 'bigint', nullable: true })
  overview_image_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  overview_title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  overview_sub_title: string;

  @Column({ type: 'longtext', nullable: true })
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
  updated_at: Date;
}
