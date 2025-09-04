import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('statistics')
export class Statistic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int' })
  page_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  number: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  number_video: string;

  @Column({ type: 'text', nullable: true })  
  pipes_title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pipes_number: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  overview_image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  overview_title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  overview_sub_title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}
