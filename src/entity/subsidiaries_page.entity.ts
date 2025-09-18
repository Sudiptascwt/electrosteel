import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity('subsidiaries_page')
export class SubsidiariesPage {
  @PrimaryGeneratedColumn({ name: 'id' })
id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  banner_image: string;

  @Column({ type: 'longtext', nullable: true })
  title: string;

  @Column({ type: 'longtext', nullable: false })
  description: string;  

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @UpdateDateColumn({ name: 'created_at', type: 'datetime' })
  createddAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modifiedAt: Date;
}
