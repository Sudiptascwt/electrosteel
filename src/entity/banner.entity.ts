import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('banners')
export class Banner {
  @PrimaryGeneratedColumn()
  banner_id: number;

  @Column({ type: 'varchar', length: 255 })
  banner_title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  banner_sub_title: string;

  @Column({ type: 'text', nullable: true })  
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  alise: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  banner_image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  url2: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  alt_tag: string;

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}
