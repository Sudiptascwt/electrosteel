import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('corporate_profile') 
export class CorporateProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'longtext' })
  page_meta_key: string;

  @Column({ type:'longtext' })
  page_meta_value: string;

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
