import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('contact_details') 
export class ContactDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  office_id: number;

  @Column({ nullable: true })
  contact_person: string;

  @Column({ nullable: true })
  phone_no: string;

  @Column({ nullable: true })
  alter_phone_no: string;

  @Column({ nullable: true })
  fax: string;

  @Column({ nullable: true })
  fax_branch: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
