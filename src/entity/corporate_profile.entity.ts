import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('corporate_profile') 
export class CorporateProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'longtext' })
  page_meta_key: string;

  @Column({ type:'longtext' })
  page_meta_value: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
