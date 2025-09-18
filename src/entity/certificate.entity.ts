import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
id: number;

  @Column()
  title: string;

  @Column()
  iso_number: string;
  unique: true

  // New Columns
  @Column({ nullable: true }) // Image is optional
  image: string;

  @Column({ nullable: true }) // Alt tag for SEO
  image_alt_tag: string;

  @Column({ default: 1 }) // 1 = Active, 0 = Inactive
  status: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}
