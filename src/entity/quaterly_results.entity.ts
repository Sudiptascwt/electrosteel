import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('quality_results') 
export class QualityResults {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'varchar', length:'255', nullable: true })
  start_date: string;

  @Column({ type:'varchar', length:'255', nullable: true })
  end_date: string;

  @Column({ type:'longtext' }) 
  title: string;

  @Column({ type:'longtext' })
  pdf: string;

  @Column({ type:'bigint', nullable: true })
  pdf_id: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1, // 1 = Active, 0 = Inactive
  })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

