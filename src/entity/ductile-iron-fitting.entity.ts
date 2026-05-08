import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('ductile_iron_fittings')
export class DuctileIronFitting {
  @PrimaryGeneratedColumn()
  id: number;

  // ==================== OVERVIEW SECTION ====================
  @Column({ type: 'text', nullable: true })
  overview_title: string;

  @Column({ type: 'longtext', nullable: true })
  overview_description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  overview_image: string;

  // ==================== WHY CHOOSE SECTION ====================
  @Column({ type: 'text', nullable: true })
  why_choose_title: string;

  @Column({ type: 'longtext', nullable: true })
  why_choose_lists: string;

  // ==================== PRODUCT DETAILS SECTION ====================
  @Column({ type: 'text', nullable: true })
  product_details_title: string;

  @Column({ type: 'longtext', nullable: true })
  product_details_description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  product_details_image: string;

  // ==================== FITTINGS RANGE SECTION ====================
  @Column({ type: 'text', nullable: true })
  fittings_range_title: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  fittings_range_image: string;

  @Column({ type: 'longtext', nullable: true })
  fittings_range_description: string;

  // ==================== APPLICATION SECTION ====================
  @Column({ type: 'text', nullable: true })
  application_title: string;

  @Column({ type: 'longtext', nullable: true })
  application_lists: string;  // Store as JSON string

  // ==================== JOINTING SYSTEMS SECTION ====================
  @Column({ type: 'text', nullable: true })
  jointing_systems_data: string;  // Store as JSON string

  // ==================== PROTECTION SYSTEM - INTERNAL ====================
  @Column({ type: 'text', nullable: true })
  protection_internal_title: string;

  @Column({ type: 'longtext', nullable: true })
  protection_internal_table: string;  // Store as JSON string

  // ==================== PROTECTION SYSTEM - EXTERNAL ====================
  @Column({ type: 'text', nullable: true })
  protection_external_title: string;

  @Column({ type: 'longtext', nullable: true })
  protection_external_table: string;  // Store as JSON string

  // ==================== CARD SECTION ====================
  @Column({ type: 'longtext', nullable: true })
  card_section_data: string;  // Store as JSON string

  // ==================== COMMON FIELDS ====================
  @Column({ type: 'varchar', length: 50, nullable: true })
  section_type: string;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}