import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('about_technology_innovation')
export class about_technology_innovation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'text', nullable: true })
  title: string;

  @Column({ type:'text', nullable: true })
  description: string;

  @Column({ type:'text', nullable: true })
  video: string;

  @Column({ type:'text', nullable: true })
  url: string;

  @CreateDateColumn({ 
    name: 'created_at', 
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @UpdateDateColumn({ 
    name: 'updated_at', 
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;
}
