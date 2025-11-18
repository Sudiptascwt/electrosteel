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
  title1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  number1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  number_video1: string;

  @Column({ type: 'bigint', nullable: true })
  number_video_id_1: number;

  @Column({ type: 'varchar', length: 255 })
  title2: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  number2: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  number_video2: string;

  @Column({ type: 'bigint', nullable: true })
  number_video_id_2: number;

  @Column({ type: 'varchar', length: 255 })
  title3: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  number3: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  number_video3: string;

  @Column({ type: 'bigint', nullable: true })
  number_video_id_3: number;

  @Column({ type: 'varchar', length: 255 })
  title4: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  number4: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  number_video4: string;

  @Column({ type: 'bigint', nullable: true })
  number_video_id_4: number;

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

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}
