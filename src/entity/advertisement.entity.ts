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

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  sub_title: string;

  @Column({ type: 'text', nullable: true })
  box_title: string;

  @Column({ type: 'text', nullable: true })
  box_data: string;

  @Column({ type: 'text', nullable: true })
  image_title: string;

  @Column({ type: 'text', nullable: true })
  image1: string;

  @Column({ type: 'text', nullable: true })
  image2: string;

  @Column({ type: 'text', nullable: true })
  image3: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
