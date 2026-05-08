import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ProductDetails } from './ductile_iron_fitting_product_details.entity';

@Entity('product_details_standard')
export class ProductDetailsStandard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_details_id' })
  product_details_id: number;

  @Column({ name: 'standard_name', type: 'text' })
  standard_name: string;

  @Column({ name: 'sort_order', default: 0 })
  sort_order: number;

  @ManyToOne(() => ProductDetails, (productDetails) => productDetails.standards)
  @JoinColumn({ name: 'product_details_id' })
  product_details: ProductDetails;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}