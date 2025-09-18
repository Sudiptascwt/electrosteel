import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('informations')
export class Information {
  @PrimaryGeneratedColumn({ name: 'id' })
id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title?: string;

  @Column({ type: 'datetime', nullable: true })
  date?: Date;

  @Column({ type: 'longtext', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  icon_image?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  video_image?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link?: string;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: 0 | 1;

  @CreateDateColumn({ type: 'datetime' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'datetime' })
  modified_at?: Date;
}
