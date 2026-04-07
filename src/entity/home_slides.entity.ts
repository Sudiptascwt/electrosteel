import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('home_slides')
export class home_slides {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  type: string;

  @Column({ type: 'varchar', length: 225, nullable: true })
  src: string;

  @Column({ type: 'text', nullable: true })
  highlight: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  style: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}