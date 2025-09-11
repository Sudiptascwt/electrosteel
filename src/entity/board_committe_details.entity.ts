import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";
import { BoardCommitteType } from "./board_committee_type.entity";

@Entity('board_committee_details')
export class BoardCommitteDetails {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  // relation to BoardCommitteType
  @ManyToOne(() => BoardCommitteType, { eager: true })  // eager loads the type
  @JoinColumn({ name: 'board_id' }) // foreign key column
  board: BoardCommitteType;

  @Column({ type: 'integer', nullable: false })
  board_id: number;  

  @Column({ type: 'varchar', nullable: false })
  name: string;  

  @Column({ type: 'varchar', nullable: true })
  category: string;  

  @Column({ type: 'varchar', nullable: true })
  position: string; 

  @UpdateDateColumn({ name: 'created_at', type: 'datetime', nullable: true })
  createddAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: true })
  modifiedAt: Date;
}
