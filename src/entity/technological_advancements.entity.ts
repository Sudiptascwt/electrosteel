import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity('technological_advancements')
export class TechnologicalAdvancements {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  image: string;

  @UpdateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modifiedAt: Date;
}
