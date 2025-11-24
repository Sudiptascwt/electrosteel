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
