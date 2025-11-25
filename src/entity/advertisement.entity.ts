import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('advertisement')
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  page_id: number;

  @Column({ type: 'text', nullable: true })
  title1: string;

  @Column({ type: 'text', nullable: true })
  title2: string;

  @Column({ type: 'text', nullable: true })
  sub_title1: string;

  @Column({ type: 'text', nullable: true })
  sub_title2: string;

  @Column({ type: 'text', nullable: true })
  features: string;

  @Column({ type: 'text', nullable: true })
  image1: string;

  @Column({ type: 'text', nullable: true })
  image2: string;

  @Column({ type: 'text', nullable: true })
  image3: string;

  @Column({ type: 'bigint', nullable: true })
  image1_id: number;

  @Column({ type: 'bigint', nullable: true })
  image2_id: number;

  @Column({ type: 'bigint', nullable: true })
  image3_id: number;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: 0 | 1;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
