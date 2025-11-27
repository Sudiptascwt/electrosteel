import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('all_pages_title') 
export class AllPagesTitle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'text',nullable: true })
  page_name: string;

  @Column({ type:'text',nullable: true })
  name1: string;

  @Column({ type:'text', nullable: true })
  name2: string;

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
