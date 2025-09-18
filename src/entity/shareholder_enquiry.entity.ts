import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('shareholder_enquiry')
export class ShareholderEnquiry {
  @PrimaryGeneratedColumn({ name: 'id' })
id: number;

  @Column({ type: 'varchar', length: 255 })
  name : string;

  @Column({ type: 'longtext' })
  folio: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;
  
  @Column({ type: 'varchar', length: 255  })
  mobile: string;

  @Column({ type: 'longtext' })
  query: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modifiedAt: Date;
}
