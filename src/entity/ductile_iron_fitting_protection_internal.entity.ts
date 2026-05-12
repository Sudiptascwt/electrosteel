import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProtectionInternalItem } from './ductile_iron_fitting_protection_internal_item.entity';

@Entity('ductile_iron_fitting_protection_internal')
export class DuctileIronFittingsProtectionInternal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @OneToMany(() => ProtectionInternalItem, (item) => item.protection_internal, { cascade: true })
  items: ProtectionInternalItem[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ type: 'text', nullable: true })
category: string;
}