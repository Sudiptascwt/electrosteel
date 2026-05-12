import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { WhyChoose } from './ductile_iron_fitting_why_choose.entity';

@Entity('ductile_iron_fitting_why_choose_list')
export class WhyChooseList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'why_choose_id' })
  why_choose_id: number;

  @Column({ name: 'list_item', type: 'text' })
  list_item: string;

  @Column({ name: 'sort_order', default: 0 })
  sort_order: number;

  @ManyToOne(() => WhyChoose, (whyChoose) => whyChoose.lists)
  @JoinColumn({ name: 'why_choose_id' })
  why_choose: WhyChoose;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @Column({ type: 'text', nullable: true })
category: string;
}