import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";
import { PipeArt } from "./pipe_art.entity";

@Entity('pipe_art_details')
export class PipeArtDetail {
  @PrimaryGeneratedColumn({ name: 'id' })
id: number;

  @Column()
  pipe_id: number;  

  @ManyToOne(() => PipeArt, (pipeArt) => pipeArt.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pipe_id' }) // <-- Maps the relation
  pipeArt: PipeArt;

  @Column({ name: 'heading_image', type: 'varchar', length: 255, nullable: true })
  heading_image: string;

  @Column({ name: 'caption', type: 'varchar', length: 255, nullable: true })
  caption: string;

  @Column({ name: 'content_image', type: 'varchar', length: 255, nullable: true })
  content_image: string;

  @Column({ name: 'description', type: 'longtext', nullable: true })
  description: string;

  @Column({ name: 'add_image', type: 'varchar', length: 255, nullable: true })
  add_image: string;

  @Column({ name: 'left_image', type: 'varchar', length: 255, nullable: true })
  left_image: string;

  @Column({ name: 'right_image', type: 'varchar', length: 255, nullable: true })
  right_image: string;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modifiedAt: Date;
}
