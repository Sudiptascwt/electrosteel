import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ProtectionInternalItem } from './ductile_iron_fitting_protection_internal_item.entity';

@Entity('protection_internal_modal')
export class ProtectionInternalModal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'protection_internal_item_id' })
  protection_internal_item_id: number;

  @Column({ name: 'image_url', type: 'text', nullable: true })
  image_url: string;

  @Column({ type: 'text', nullable: true })
  label: string;

  @Column({ type: 'text', nullable: true })
  description1: string;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description2: string;

  @Column({ name: 'sort_order', default: 0 })
  sort_order: number;

  @ManyToOne(() => ProtectionInternalItem, (item) => item.modals)
  @JoinColumn({ name: 'protection_internal_item_id' })
  protection_internal_item: ProtectionInternalItem;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}