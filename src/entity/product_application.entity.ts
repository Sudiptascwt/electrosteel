import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('product_applications')
export class product_applications {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    title: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modifiedAt: Date;
}
