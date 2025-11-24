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

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: 0 | 1; 

  @UpdateDateColumn({ name: 'created_at', type: 'datetime' })
  createddAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modifiedAt: Date;
}
