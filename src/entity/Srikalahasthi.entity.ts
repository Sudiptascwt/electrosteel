import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('srikalahasthi') 
export class Srikalahasthi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'text' })
  name: string;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

