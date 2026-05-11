// entities/product-details.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('product_details')
export class ProductDetails extends BaseEntity {
    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'longtext', nullable: true })
    desc: string;

    @Column({ type: 'text', nullable: true })
    productCode: string;

    @Column({ type: 'text', nullable: true })
    dimensionTitle: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    dimensionImage: string;

    @Column({ type: 'text', nullable: true })
    tableTitle: string;

    @Column({ type: 'longtext', nullable: true })
    productTable: string; // JSON string

    @Column({ type: 'longtext', nullable: true })
    tableExtraData: string; // JSON strin
}