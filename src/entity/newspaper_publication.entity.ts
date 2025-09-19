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

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}
