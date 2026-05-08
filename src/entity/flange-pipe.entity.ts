import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('flange_pipes')
export class FlangePipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  dn: string;

  @Column({ type: 'text', nullable: true })
  external_dia: string;

  @Column({ type: 'text', nullable: true })
  tolerance_de: string;

  @Column({ type: 'text', nullable: true })
  pressure_class: string;

  @Column({ type: 'text', nullable: true })
  thickness_class: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  flange_type: string;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  // Table section fields
  @Column({ type: 'text', nullable: true })
  table_label: string;

  @Column({ type: 'text', nullable: true })
  table_note: string;

  @Column({ type: 'longtext', nullable: true })
  table_headers: string;  // Store JSON string

  @Column({ type: 'longtext', nullable: true })
  table_data: string;  // Store JSON string

  // Application section fields
  @Column({ type: 'text', nullable: true })
  application_title: string;

  @Column({ type: 'longtext', nullable: true })
  application_description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  application_image: string;

  // Advantage section fields
  @Column({ type: 'text', nullable: true })
  advantage_title: string;

  @Column({ type: 'longtext', nullable: true })
  advantage_description: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}