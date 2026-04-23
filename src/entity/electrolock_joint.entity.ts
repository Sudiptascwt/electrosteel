import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('product_innovation_electrolock_joint')
export class ElectrolockJoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'longtext', nullable: true })
  desc: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'text', nullable: true })
  downloadLink: string;

  @Column({ type: 'text', nullable: true })
  videoLink: string;

  @Column({ type: 'text', nullable: true })
  faqLink: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}