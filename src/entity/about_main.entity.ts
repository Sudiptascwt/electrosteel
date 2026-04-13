import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('about_main')
export class AboutMain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'varchar', length:'255', nullable: true })
  title: string;

  @Column({ type:'varchar', length:'255', nullable: true })
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
