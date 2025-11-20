import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('ductile_iron_fittings_applications') 
export class DuctileIronFittingsApplications {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'longtext', nullable: false })
    features: string;

    @Column({ type:'longtext', nullable: true })
    images: string;

    @Column({ type:'bigint', nullable: true })
    images_id: number;

    @Column({type: 'longtext', nullable: true })
    below_images: string;

    @Column({ type:'bigint', nullable: true })
    below_images_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
