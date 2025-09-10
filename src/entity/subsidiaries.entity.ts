import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity('subsidiaries')
export class Subsidiaries {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'text', nullable: false })
  country_link: string;  

  @Column({ type: 'text', nullable: true })
  country_style: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  country_name: string;

  @Column({type: 'text', nullable: true })
  description: string;

  @UpdateDateColumn({ name: 'created_at', type: 'datetime', nullable: true })
  createddAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: true })
  modifiedAt: Date;
}
