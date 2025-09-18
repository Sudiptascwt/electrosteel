import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('csr_overview') 
export class CsrOverview {
  @PrimaryGeneratedColumn()
id: number;

  @Column({ type:'longtext'})
  title_description: string;

  @Column({ type:'longtext'})
  csr_objective_description: string;

  @Column({ type:'longtext'})
  csr_objective_image: string;

  @Column({ type:'longtext'})
  key_focus_area_image: string;

  @Column({ type:'longtext'})
  key_focus_area_description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
