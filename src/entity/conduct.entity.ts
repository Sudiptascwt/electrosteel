import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('conduct') 
export class Conduct {
  @PrimaryGeneratedColumn()
id: number;

  @Column({ length:255, nullable: false })
  title: string;

  @Column({ type: 'longtext' })
  pdf: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
