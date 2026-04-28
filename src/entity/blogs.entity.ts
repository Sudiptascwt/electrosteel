import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blogs')
export class Blogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  type: string;

  @Column({ type: 'longtext', nullable: true })
  category: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  date: string;

  @Column({ type: 'longtext', nullable: true })
  title: string;

  // text editor
  @Column({ type: 'longtext', nullable: true })
  description: string;

  @Column({ type: 'longtext', nullable: true })
  image: string;

  @Column({ type: 'longtext', nullable: true })
  images: string;

  @Column({ type: 'longtext', nullable: true })
  link: string;

  @Column({ type: 'text', nullable: true })
  slug: string;

  // ✅ NEW FIELDS ADDED

  @Column({ type: 'text', nullable: true })
  location: string;

  @Column({ type: 'text', nullable: true })
  subtitle: string;

  @Column({ type: 'text', nullable: true })
  banner_title: string;

  @Column({ type: 'longtext', nullable: true })
  banner_image: string;

  @Column({ type: 'longtext', nullable: true })
  editor_description: string;

  @Column({ type: 'longtext', nullable: true })
  slider_contet: string; // ⚠️ typo kept same as DTO

  @Column({ type: 'longtext', nullable: true })
  slider_image: string;

  @Column({ type: 'text', nullable: true })
  badge: string;

  // timestamps
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}