import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';
import { DuctileIronFittingsApplication } from './ductile_iron_fitting_application.entity';
import { ApplicationItem } from './ductile_iron_fitting_application_item.entity';

@Entity('application_column')
export class ApplicationColumn {
@PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'application_id' })
  application_id: number;

  @Column({ name: 'column_index' })
  column_index: number;

  @Column({ name: 'sort_order', default: 0 })
  sort_order: number;

  @ManyToOne(() => DuctileIronFittingsApplication, (application: DuctileIronFittingsApplication) => application.columns)
  @JoinColumn({ name: 'application_id' })
  application: DuctileIronFittingsApplication;

  @OneToMany(() => ApplicationItem, (item: ApplicationItem) => item.application_column)
  items: ApplicationItem[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}