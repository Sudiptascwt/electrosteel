import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('news_paper_publication')
export class NewsPaperPublication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length:'255' })
  start_date: string;

  @Column({ type: 'varchar', length:'255' })
  end_date: string;

  @Column({ type: 'longtext' })
  title: string;

  @Column({ type: 'text' })
  pdf: string;

  @Column({ type: 'bigint', nullable: true })
  pdf_id: number;

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
