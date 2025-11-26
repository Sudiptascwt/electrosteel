import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CorporateProfileTestimonial } from './coporate_profile_testimonial.entity';

@Entity('corporate_profile')
export class CorporateProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name1: string;

  @Column({ type: 'text', nullable: true })
  name2: string;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @Column({ type: 'varchar', length:255, nullable: true })
  heading: string;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: number; 

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => CorporateProfileTestimonial,
    (testimonial) => testimonial.corporateProfile,
  )
  testimonials: CorporateProfileTestimonial[];
}
