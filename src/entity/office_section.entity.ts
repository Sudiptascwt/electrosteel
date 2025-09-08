import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('office_details')
export class officeDetails {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    office_type: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    contact_title: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    google_map_link: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: true })
    modifiedAt: Date;
}
