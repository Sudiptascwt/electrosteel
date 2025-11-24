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
  
  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: 0 | 1;

  @CreateDateColumn()
  created_at: Date;
}
