import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('ductile_iron_fitting_card_section')
export class CardSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'icon_url', type: 'text' })
  icon_url: string;

  @Column({ name: 'sort_order', default: 0 })
  sort_order: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ type: 'text', nullable: true })
category: string;
}