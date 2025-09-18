import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('csr_report_content') 
export class CsrReportContent {
  @PrimaryGeneratedColumn()
id: number;

  @Column({type: 'longtext', nullable: true })
  page_meta_key: string;

  @Column({ type: 'longtext' })
  page_meta_value: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
