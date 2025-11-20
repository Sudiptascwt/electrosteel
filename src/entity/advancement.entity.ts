import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('advancements')
export class Advancement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type:'bigint', nullable: true })
  image_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pdf: string;

  @Column({ type:'bigint', nullable: true })
  pdf_id: number;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link: string;
  
  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: 0 | 1; 
}
