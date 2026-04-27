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

  @Column({ type: 'text' })
  type: string;

  @Column({ type: 'longtext' })
  category: string;

  @Column({ type: 'varchar', length:255, nullable: true })
  date: string;

  @Column({ type: 'longtext' })
  title: string;

  //text editor
  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'longtext' })
  image: string;

  @Column({ type: 'longtext', nullable: true })
  link: string;

  @Column({ type: 'longtext', nullable: true })
  images: string;

  @Column({ type: 'text', nullable: true })
  slug: string;
  
  // @Column({
  //   type: 'tinyint',
  //   default: 1,
  // })
  // status: 0 | 1; 

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}
