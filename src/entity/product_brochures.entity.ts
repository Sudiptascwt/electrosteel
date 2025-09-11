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
    
    @Column({ type: 'longtext', nullable: true })
    pdf: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: true })
    modifiedAt: Date;
}
