import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('all_certificates')
export class AllCertificate {
  @PrimaryGeneratedColumn()
id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'datetime', nullable: true })
  date: Date;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  icon_image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  video_image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  certificate_body: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  certificate: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pdf: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pdf2: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  standrad: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ranges: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  scope: string;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: 0 | 1;

  @Column({
    type: 'enum',
    enum: ['system', 'product', 'bodies'],
    default: 'system',
  })
  type: 'system' | 'product' | 'bodies';

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  modified_at: Date;
}
