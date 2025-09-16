import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('career_enquiry')
export class CareerEnquiry {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'longtext', nullable: true })
  dob: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone_number: string;

  @Column({ type: 'text' })
  post_applied_for: string;

  @Column({ type: 'integer' })
  years_exp: number;

  @Column({ type: 'longtext' })
  education_qualification: string;

  @Column({ type: 'text', nullable: true })
  pdf: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modifiedAt: Date;
}
