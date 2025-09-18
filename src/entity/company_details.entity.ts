import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('company_details') 
export class CompanyDetails {
  @PrimaryGeneratedColumn()
id: number;

  @Column()
  page_id: number;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
