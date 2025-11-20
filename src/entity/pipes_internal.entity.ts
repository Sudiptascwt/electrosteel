import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity('internal_pipes')
export class InternalPipes {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name:'title', type:'text', nullable: true })
  title: string;  

  @Column({ name: 'description', type: 'longtext', nullable: true })
  description: string;

  @Column({ name: 'guiding_stadards', type:'text', nullable: true })
  guiding_stadards: string;

  @Column({ name: 'url', type:'text', nullable: true })
  url: string;

  @Column({ name: 'pdf', type: 'text', nullable: true })
  pdf: string;

  @Column({ type:'bigint', nullable: true })
  pdf_id: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modified_at: Date;
}
