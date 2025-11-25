import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('other_products') 
export class OtherProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'text', nullable: true })
  title: string;

  @Column({ type:'text',nullable: true })
  image: string;

  @Column({ type:'bigint', nullable: true })
  image_id: number;

  @Column({ type:'text',nullable: true })
  description: string;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1, // 1 = Active, 0 = Inactive
  })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}