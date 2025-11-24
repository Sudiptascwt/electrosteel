import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('product_brochures')
export class ProductBrochures {
    @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    title: string;
    
    @Column({ type: 'varchar', length: 255, nullable: true })
    sub_title: string;
    
    @Column({ type: 'longtext', nullable: true })
    image: string;

    @Column({ type:'bigint', nullable: true })
    image_id: number;
    
    @Column({ type: 'longtext', nullable: true })
    pdf: string;

    @Column({ type:'bigint', nullable: true })
    pdf_id: number;

    @Column({
      type: 'tinyint',
      width: 1,
      default: 1, // 1 = Active, 0 = Inactive
    })
    status: number;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modifiedAt: Date;
}
