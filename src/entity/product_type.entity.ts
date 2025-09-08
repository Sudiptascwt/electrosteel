import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('product_applications')
export class ProductType {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: true })
    modifiedAt: Date;
}
