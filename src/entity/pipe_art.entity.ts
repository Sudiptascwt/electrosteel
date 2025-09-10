import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { PipeArtDetail } from "./pipe_art_details.entity";

@Entity('pipe_art')
export class PipeArt {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'text', nullable: true })
  url: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: true })
  modifiedAt: Date;

  // ✅ Relation with PipeArtDetail
  @OneToMany(() => PipeArtDetail, (detail) => detail.pipeArt, {
    cascade: true,
    eager: true, // optional: auto-load details
    onDelete: 'CASCADE',
  })
  details: PipeArtDetail[];
}
