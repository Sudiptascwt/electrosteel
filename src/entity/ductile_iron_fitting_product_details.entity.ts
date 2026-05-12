import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductDetailsStandard } from './ductile_iron_fitting_product_details_standard.entity';

@Entity('ductile_iron_fitting_product_details')
export class DuctileIronFittingsProductDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'image_url', type: 'text' })
  image_url: string;

  @OneToMany(() => ProductDetailsStandard, (standard) => standard.product_details, { cascade: true })
  standards: ProductDetailsStandard[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ type: 'text', nullable: true })
category: string;
}