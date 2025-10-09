import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PipesJointing } from './pipes_jointing.entity'; 

@Entity('pipes_jointing_details')
export class PipesJointingDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  pipes_jointing_id: number;

  @ManyToOne(() => PipesJointing, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pipes_jointing_id' })
  pipes_jointing: PipesJointing;

  @Column({ type: 'longtext', nullable: true })
  image1: string;

  @Column({ type: 'longtext', nullable: true })
  image2: string;

  @Column({ type: 'longtext', nullable: true })
  image3: string;

  @Column({ type: 'longtext', nullable: true })
  image4: string;

  @Column({ type: 'longtext', nullable: true })
  content: string;

  @Column({ type: 'longtext', nullable: true })
  title: string;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @Column({ type: 'longtext', nullable: true })
  table_note: string;

  @Column({ type: 'longtext', nullable: true })
  content_image: string;

  @Column({ type: 'longtext', nullable: true })
  add_title: string;

  @Column({ type: 'longtext', nullable: true })
  add_description: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modified_at: Date;
}
