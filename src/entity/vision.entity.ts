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

  @Column({ type: 'text', nullable: false })
  name1: string;  

  @Column({ type: 'text', nullable: false })
  name2: string;  

  @Column({ type: 'longtext', nullable: false })
  heading: string;  

  @Column({ type: 'longtext', nullable: true })
  image: string;

  @Column({type: 'longtext', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: false })
  principle_title_name1: string;  

  @Column({ type: 'text', nullable: false })
  principle_title_name2: string;  

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
