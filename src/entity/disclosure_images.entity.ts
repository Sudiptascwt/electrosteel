import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";
import { Disclosure } from "./disclosure.entity";

@Entity('disclosure_images')
export class DisclosureImages {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    // Foreign key relationship to Disclosure entity
    @ManyToOne(() => Disclosure, unclaimed => unclaimed.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'disclosure_id' })
    Disclosure: Disclosure;

    @Column({ type: 'text', nullable: false })
    title: string;

    @Column({ type: 'text', nullable: false })
    image: string;

    @Column({ type: 'bigint', nullable: true })
    image_id: number;

    @Column({
      type: 'tinyint',
      default: 1,
    })
    status: 0 | 1; 

    @UpdateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modifiedAt: Date;
}