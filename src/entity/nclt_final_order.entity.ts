import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('nclt_final_order') 
export class NcltFinalOrder {
  @PrimaryGeneratedColumn()
id: number;

  @Column({ type:'longtext' })
  title: string;

  @Column({ type:'longtext' })
  pdf: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

