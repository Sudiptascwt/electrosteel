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

  @Column({ type: 'longtext' })
  category: string;

  @Column({ type: 'longtext' })
  title: string;

  //text editor
  @Column({ type: 'longtext' })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}
