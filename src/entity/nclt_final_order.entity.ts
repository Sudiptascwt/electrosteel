import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('nclt_final_order') 
export class NcltFinalOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'longtext' })
  title: string;

  @Column({ type:'longtext' })
  pdf: string;
  
  @Column({ type: 'bigint', nullable: true })
  pdf_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

