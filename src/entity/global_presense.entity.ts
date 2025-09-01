import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('gobal')
export class GlobalPresence {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  style: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: 0 | 1;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: true })
  modifiedAt: Date;
}
