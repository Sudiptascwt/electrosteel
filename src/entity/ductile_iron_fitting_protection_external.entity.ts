import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProtectionExternalItem } from './ductile_iron_fitting_protection_external_item.entity';

@Entity('ductile_iron_fitting_protection_external')
export class DuctileIronFittingsProtectionExternal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @OneToMany(() => ProtectionExternalItem, (item) => item.protection_external, { cascade: true })
  items: ProtectionExternalItem[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ type: 'text', nullable: true })
category: string;
}