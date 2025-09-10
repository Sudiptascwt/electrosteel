import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('csr_key') 
export class CsrKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'varchar', length:255, nullable: false })
  title: string;

  @Column({ type:'varchar', length:255, nullable: true })
  type_image: string;

  @Column({type: 'longtext', nullable: true })
  description: string;

  @Column({ type: 'longtext' })
  heading: string;

  @Column({ type: 'longtext' })
  first_list: string;

  @Column({ type: 'longtext' })
  second_list: string;

  @Column({ type:'varchar', length:255, nullable: true })
  first_image: string;

  @Column({ type:'varchar', length:255, nullable: true })
  second_image: string;
  
  @Column({ type:'varchar', length:255, nullable: true })
  third_image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
