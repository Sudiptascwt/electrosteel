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

  @Column({ type: 'longtext', nullable: false })
  country_link: string;  

  @Column({ type: 'longtext', nullable: true })
  country_style: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  country_name: string;

  @Column({type: 'longtext', nullable: true })
  description: string;

  @UpdateDateColumn({ name: 'created_at', type: 'datetime' })
  createddAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modifiedAt: Date;
}
