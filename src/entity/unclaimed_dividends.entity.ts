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

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1, // 1 = Active, 0 = Inactive
  })
  status: number;

  @UpdateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modifiedAt: Date;

  @OneToMany(() => UnclaimedDividendsImages, image => image.unclaimedDividend)
  images: UnclaimedDividendsImages[];
}
