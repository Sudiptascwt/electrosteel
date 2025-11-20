import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('iepf_suspense') 
export class IepfSuspense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text',nullable: true })
  title: string;

  @Column({ type: 'text',nullable: true })
  pdf: string;

  @Column({ type: 'bigint',nullable: true })
  pdf_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
