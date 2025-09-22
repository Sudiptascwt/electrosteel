import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { UnclaimedDividendsImages } from "./unclaimed_dividends_images.entity";

@Entity('unclaimed_dividends')
export class UnclaimedDividends {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @UpdateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modifiedAt: Date;

  @OneToMany(() => UnclaimedDividendsImages, image => image.unclaimedDividend)
  documents: UnclaimedDividendsImages[];
}
