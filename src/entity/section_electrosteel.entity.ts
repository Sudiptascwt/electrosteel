import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('section_electro_stell') 
export class SectionElectrosteel {
  @PrimaryGeneratedColumn()
id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'longtext',nullable: true })
  description: string;
    
  @Column({ nullable: true })
  qualities: string;

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
