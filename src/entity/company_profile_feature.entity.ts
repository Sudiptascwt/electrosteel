import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('about_feature')
export class AboutBanner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'longtext' })
    title: string;

    @Column({ type: 'longtext', nullable: true })
    description: string;

    @Column({ type: 'longtext' })
    image: string;

    @Column({
      type: 'tinyint',
      default: 1,
    })
    status: 0 | 1; 

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}