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

  @Column({ type: 'longtext' })
  year: string;

  @Column({ type: 'longtext' })
  month: string;

  @Column({ type: 'longtext' })
  image: string;

  @Column({ type: 'longtext' })
  pdf: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}
