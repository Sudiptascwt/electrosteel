// src/entity/global_presence.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('india_office')
export class indiaOffice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  direction: string;

  @Column({ type: 'text', nullable: true })
  address: string[];

  @Column({ type: 'text', nullable: true })
  contact: string[];

  @Column({ type: 'text', nullable: true })
  map_link: string;

  @Column({ type: 'text',  nullable: true })
  city: string;

  @Column({ type: 'text', nullable: true })
  phone: string;

  @Column({ type: 'text',  nullable: true })
  email: string;

  @Column({ type: 'text',  nullable: true })
  fax: string;

  @Column({ type: 'text', nullable: true })
  website: string;

  @Column({ name: 'contact_person', nullable: true })
  contact_person: string;

  @Column({ type: 'text', nullable: true })
  country: string;

  @Column({ type: 'text', nullable: true })
  label: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  properties: any;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ name: 'btn_link', type: 'text',  nullable: true })
  btn_link: string;

  @Column({ type: 'text',  nullable: true })
  category: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}