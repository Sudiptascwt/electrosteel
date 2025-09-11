import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity('board_committee_types')
export class BoardCommitteType {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  type: string;  

  @UpdateDateColumn({ name: 'created_at', type: 'datetime', nullable: true })
  createddAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: true })
  modifiedAt: Date;
}
