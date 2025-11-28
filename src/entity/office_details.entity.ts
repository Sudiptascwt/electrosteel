import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('all_office_details')
export class AllOfficeDetails {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  country?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  direction?: string;
    
  @Column({ type: 'varchar', length: 255, nullable: true })
  city?: string;

  @Column({ type: 'longtext', nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ph_no?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  alternate_ph_no?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fax_no?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contact_person?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  google_map_link?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  region?: string;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1, // 1 = Active, 0 = Inactive
  })
  status: number;

  @CreateDateColumn({ type: 'datetime'})
  created_at?: Date;

  @UpdateDateColumn({ type: 'datetime'})
  modified_at?: Date;
}
