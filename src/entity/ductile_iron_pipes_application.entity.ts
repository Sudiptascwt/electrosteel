import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('ductile_iron_pipes_applications') 
export class DuctileIronPipeApplications {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'longtext', nullable: false })
    features: string;

    @Column({ type:'longtext', nullable: true })
    images: string;

    @Column({type: 'longtext', nullable: true })
    below_images: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
