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

  @UpdateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
  modifiedAt: Date;

  @OneToMany(() => DisclosureImages, image => image.Disclosure)
  images: DisclosureImages[];
}
