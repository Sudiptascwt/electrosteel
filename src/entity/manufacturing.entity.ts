import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('manufacturing_unit')
export class ManufacturingUnit {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    title: string;

    @Column({ type: 'longtext', nullable: true })
    address: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    phone_number: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    alt_phone_number: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    fax_number: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    google_map_link: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: true })
    modifiedAt: Date;
}
