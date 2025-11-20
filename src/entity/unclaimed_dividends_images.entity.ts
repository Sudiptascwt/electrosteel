import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";
import { UnclaimedDividends } from "./unclaimed_dividends.entity";

@Entity('unclaimed_dividends_images')
export class UnclaimedDividendsImages {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  // Foreign key relationship to UnclaimedDividends
  @ManyToOne(() => UnclaimedDividends, unclaimed => unclaimed.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'unclaimed_id' })
  unclaimedDividend: UnclaimedDividends;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  image: string;

  @Column({ type: 'bigint', nullable: true })
  image_id: number;

  @UpdateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modifiedAt: Date;
}
