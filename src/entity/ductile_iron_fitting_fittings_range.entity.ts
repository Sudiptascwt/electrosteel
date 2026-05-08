import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { FittingsRangeItem } from './ductile_iron_fitting_fittings_range_item.entity';

@Entity('fittings_range')
export class FittingsRange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ name: 'image_url', type: 'text' })
  image_url: string;

  @OneToMany(() => FittingsRangeItem, (item) => item.fittings_range, { cascade: true })
  items: FittingsRangeItem[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}