import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('subsidiaries_account') 
export class SubsidiariesAccount {
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

  @Column({ type: 'bigint', nullable: true })
  pdf_id: number;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: 0 | 1; 

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

