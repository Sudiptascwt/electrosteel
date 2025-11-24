import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { FittingsPipesJointing } from './ductile_iron_fittings_pipe_jointing.entity';

@Entity('ductile_fittings_pipes_jointing_details')
export class FittingsPipesJointingDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  fittings_pipes_jointing_id: number;

  @ManyToOne(() => FittingsPipesJointing, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fittings_pipes_jointing_id' })
  ductile_fittings_pipes_jointing: FittingsPipesJointing;

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

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: 0 | 1; 

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modified_at: Date;
}