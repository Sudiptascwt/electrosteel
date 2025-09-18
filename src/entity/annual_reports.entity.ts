import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('annual_reports') 
export class AnnualReports {
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

