import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApplicationColumn } from './ductile_iron_fitting_application_column.entity';

@Entity('application_item')
export class ApplicationItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'application_column_id' })
  application_column_id: number;

  @Column({ name: 'item_text', type: 'text' })
  item_text: string;

  @Column({ name: 'sort_order', default: 0 })
  sort_order: number;

  @ManyToOne(() => ApplicationColumn, (applicationColumn: ApplicationColumn) => applicationColumn.items)
  @JoinColumn({ name: 'application_column_id' })
  application_column: ApplicationColumn;

}