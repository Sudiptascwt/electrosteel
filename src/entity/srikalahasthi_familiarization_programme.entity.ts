import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('srikalahasthi_familiarization_programme') 
export class SrikalahasthiFamiliarizationProgramme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  srikalahasthi_pipe_id: number;

  @Column({type:'text'})
  page_name: string;

  @Column({type:'text'})
  page_subname: string;

  @Column({ type:'text', nullable: true })
  category: string;

  @Column({ type:'text', nullable: true })
  title: string;

  @Column({ type:'longtext', nullable: true })
  description: string;

  @Column({ type:'text', nullable: true })
  pdf: string;

  @Column({ type:'bigint', nullable: true })
  pdf_id: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1, // 1 = Active, 0 = Inactive
  })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
