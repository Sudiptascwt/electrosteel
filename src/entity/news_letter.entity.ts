import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('news_letter')
export class NewsLetter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  banner_image: string;

  @Column({ type: 'bigint', nullable: true })
  banner_image_id: number;

  @Column({ type: 'longtext' })
  year: string;

  @Column({ type: 'longtext' })
  month: string;

  @Column({ type: 'longtext' })
  image: string;

  @Column({ type: 'bigint', nullable: true })
  image_id: number;

  @Column({ type: 'longtext' })
  pdf: string;

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
