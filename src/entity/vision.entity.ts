import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity('vision')
export class Vision {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'longtext', nullable: false })
  heading: string;  

  @Column({ type: 'longtext', nullable: true })
  image: string;

  @Column({type: 'longtext', nullable: true })
  description: string;

  @UpdateDateColumn({ name: 'created_at', type: 'datetime', nullable: true })
  createddAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: true })
  modifiedAt: Date;
}
