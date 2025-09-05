import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('files')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @CreateDateColumn()
  created_at: Date;
}
