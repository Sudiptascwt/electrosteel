import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('cares')
export class Care {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @Column({ type: 'longtext', nullable: true })
  alise: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  video_image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  icon_image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  plan_type: string;

  @Column({
    type: 'enum',
    enum: ['0', '1'],
    default: '1',
  })
  status: '0' | '1';

  @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: true })
  modifiedAt: Date;
}
