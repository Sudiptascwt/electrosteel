import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity('mission')
export class Mission {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'longtext', nullable: false })
  title: string;  

  @Column({ type: 'longtext', nullable: true })
  image: string;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @UpdateDateColumn({ name: 'created_at', type: 'datetime' })
  createddAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
