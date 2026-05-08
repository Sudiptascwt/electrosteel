import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ProtectionExternalItem } from './ductile_iron_fitting_protection_external_item.entity';

@Entity('protection_external_modal')
export class ProtectionExternalModal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'protection_external_item_id' })
  protection_external_item_id: number;

  @Column({ type: 'text', nullable: true })
  label: string;

  @Column({ type: 'text', nullable: true })
  description1: string;

  @Column({ name: 'sort_order', default: 0 })
  sort_order: number;

  @ManyToOne(() => ProtectionExternalItem, (item) => item.modals)
  @JoinColumn({ name: 'protection_external_item_id' })
  protection_external_item: ProtectionExternalItem;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}