import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('srikalahasthi_directors_resignation') 
export class srikalahasthiDirectorsResignation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  srikalahasthi_pipe_id: number;

  @Column({type:'text',})
  page_name: string;

  @Column({type:'text',})
  page_subname: string;

  @Column({ type:'text', nullable: true })
  category: string;

  @Column({ type:'text', nullable: true })
  title: string;

  @Column({ type:'longtext', nullable: true })
  description: string;

  @Column({ type:'text', nullable: true })
  pdf: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
