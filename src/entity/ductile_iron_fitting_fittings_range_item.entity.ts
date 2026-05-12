import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { FittingsRange } from './ductile_iron_fitting_fittings_range.entity';

@Entity('ductile_iron_fitting_fittings_range_item')
export class FittingsRangeItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fittings_range_id' })
  fittings_range_id: number;

  @Column({ name: 'item_name', type: 'text' })
  item_name: string;

  @Column({ name: 'sort_order', default: 0 })
  sort_order: number;

  @ManyToOne(() => FittingsRange, (fittingsRange) => fittingsRange.items)
  @JoinColumn({ name: 'fittings_range_id' })
  fittings_range: FittingsRange;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @Column({ type: 'text', nullable: true })
category: string;
}