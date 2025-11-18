import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('conduct') 
export class Conduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length:255, nullable: false })
  title: string;

  @Column({ type: 'longtext' })
  pdf: string;

  @Column({ type: 'bigint', nullable: true })
  pdf_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
