import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('reports') 
export class Report {
  @PrimaryGeneratedColumn()
id: number;

  @Column({ type: 'longtext' })
  title: string;

  @Column({ type:'varchar', length:255 })
  start_date: string;

  @Column({ type:'varchar', length:255 })
  end_date: string;

  @Column({ type: 'longtext' })
  pdf: string;

  @Column({ type: 'bigint', nullable: true })
  pdf_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}


