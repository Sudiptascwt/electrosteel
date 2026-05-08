import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProtectionInternal } from './ductile_iron_fitting_protection_internal.entity';
import { ProtectionInternalModal } from './ductile_iron_fitting_protection_internal_modal.entity';

@Entity('protection_internal_item')
export class ProtectionInternalItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'protection_internal_id' })
  protection_internal_id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'guiding_standards', type: 'text', nullable: true })
  guiding_standards: string;

  @Column({ name: 'download_url', type: 'text', nullable: true })
  download_url: string;

  @Column({ name: 'sort_order', default: 0 })
  sort_order: number;

  @ManyToOne(() => ProtectionInternal, (protectionInternal) => protectionInternal.items)
  @JoinColumn({ name: 'protection_internal_id' })
  protection_internal: ProtectionInternal;

  @OneToMany(() => ProtectionInternalModal, (modal) => modal.protection_internal_item, { cascade: true })
  modals: ProtectionInternalModal[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}