import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('directors') 
export class Directors {
  @PrimaryGeneratedColumn()
id: number;

  @Column({ type:'varchar', length:255, nullable: false })
  name: string;

  @Column({ type:'varchar', length:255, nullable: true })
  designation: string;

  @Column({type: 'longtext', nullable: true })
  description: string;

  @Column({ type:'varchar', length:255, nullable: true })
  profile_image: string;

  @Column({ type: 'longtext' })
  url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
