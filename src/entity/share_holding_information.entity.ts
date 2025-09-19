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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
