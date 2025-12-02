import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('board_commitee_title')
export class BoardCommitteTitle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name1: string;

  @Column({ type: 'text' })
  name2: string;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: 0 | 1; 

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
