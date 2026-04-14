import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('about_people_data')
export class AboutPeopleData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'text', nullable: true })
  title: string;

  @Column({ type:'text', nullable: true })
  description: string;

  @Column({ type:'varchar', length:'255', nullable: true })
  video: string;

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
