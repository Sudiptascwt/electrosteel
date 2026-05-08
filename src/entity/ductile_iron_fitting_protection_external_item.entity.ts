import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProtectionExternal } from './ductile_iron_fitting_protection_external.entity';
import { ProtectionExternalModal } from './ductile_iron_fitting_protection_external_modal.entity';

@Entity('protection_external_item')
export class ProtectionExternalItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'protection_external_id' })
  protection_external_id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'guiding_standards', type: 'varchar', length: 200, nullable: true })
  guiding_standards: string;

  @Column({ name: 'sort_order', default: 0 })
  sort_order: number;

  @ManyToOne(() => ProtectionExternal, (protectionExternal) => protectionExternal.items)
  @JoinColumn({ name: 'protection_external_id' })
  protection_external: ProtectionExternal;

  @OneToMany(() => ProtectionExternalModal, (modal) => modal.protection_external_item, { cascade: true })
  modals: ProtectionExternalModal[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}