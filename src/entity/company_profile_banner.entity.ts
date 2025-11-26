import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('about_banner')
export class AboutBanner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    name1: string;

    @Column({ type: 'text' })
    name2: string;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'longtext', nullable: true })
    description: string;

    @Column({ type: 'text' })
    image: string;

    @Column({ type: 'bigint', nullable: true })
    image_id: number;

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