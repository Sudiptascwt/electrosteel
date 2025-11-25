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

  @Column({ type: 'bigint', nullable: false })
  image_id: number;  

  @Column({type: 'longtext', nullable: true })
  description: string;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1, // 1 = Active, 0 = Inactive
  })
  status: number;

  @UpdateDateColumn({ name: 'created_at', type: 'datetime' })
  createddAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modifiedAt: Date;
}
