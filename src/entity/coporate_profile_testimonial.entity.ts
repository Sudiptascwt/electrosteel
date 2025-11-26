// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
//   ManyToOne,
//   JoinColumn,
// } from 'typeorm';
// import { CorporateProfile } from './corporate_profile.entity'

// @Entity('coporate_profile_testimonial')
// export class CorporateProfileTestimonial {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @JoinColumn({ name: 'corporate_profile_id' }) 
//   corporateProfile: CorporateProfile;

//   @Column({ name: 'corporate_profile_id', type: 'int', nullable: true })
//   corporate_profile_id: number;

//   @Column({ type: 'text', nullable: true })
//   title: string;

//   @Column({ type: 'text', nullable: true })
//   image: string;

//   @Column({ type: 'longtext', nullable: true })
//   description: string;

//   @Column({ type: 'text', nullable: true })
//   person_name: string;

//   @Column({
//     type: 'tinyint',
//     default: 1,
//   })
//   status: 0 | 1;

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;
// }
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CorporateProfile } from './corporate_profile.entity';

@Entity('corporate_profile_testimonial')
export class CorporateProfileTestimonial {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => CorporateProfile,
    (profile) => profile.testimonials,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'corporate_profile_id' })
  corporateProfile: CorporateProfile;

  @Column({ name: 'corporate_profile_id', type: 'int', nullable: true })
  corporate_profile_id: number;               

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  person_name: string;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
