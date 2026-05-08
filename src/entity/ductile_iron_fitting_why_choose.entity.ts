import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { WhyChooseList } from './ductile_iron_fitting_why_choose_list.entity';

@Entity('ductile_iron_fitting_why_choose')
export class WhyChoose {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @OneToMany(() => WhyChooseList, (list) => list.why_choose, { cascade: true })
  lists: WhyChooseList[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}