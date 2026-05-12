import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApplicationColumn } from './ductile_iron_fitting_application_column.entity';

@Entity('ductile_iron_fitting_application')
export class DuctileIronFittingsApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @OneToMany(() => ApplicationColumn, (column: ApplicationColumn) => column.application)
  columns: ApplicationColumn[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ type: 'text', nullable: true })
category: string;
}