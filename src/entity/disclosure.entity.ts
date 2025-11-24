import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { DisclosureImages } from "./disclosure_images.entity";

@Entity('disclosure')
export class Disclosure {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: 0 | 1; 

  @UpdateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modifiedAt: Date;

  @OneToMany(() => DisclosureImages, image => image.Disclosure)
  images: DisclosureImages[];
}
