import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('share_holding_information') 
export class ShareHoldingInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar',nullable: true })
  start_date: string;

  @Column({ type: 'varchar',nullable: true })
  end_date: string;

  @Column({ type: 'longtext',nullable: true })
  title: string;

  @Column({ type: 'longtext',nullable: true })
  pdf: string;

  @Column({ type:'bigint', nullable: true})
  pdf_id: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1, // 1 = Active, 0 = Inactive
  })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
