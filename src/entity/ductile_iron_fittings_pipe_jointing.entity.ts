import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { FittingsPipesJointingDetails } from "./ductile_iron_fittings_pipes_jointing_details.entity";

@Entity('ductile_fittings_pipes_jointing')
export class FittingsPipesJointing {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'longtext', nullable: true })
    title: string;

    @Column({ type: 'longtext', nullable: true })
    url: string;

    @Column({ type: 'longtext', nullable: true })
    description: string;

    @Column({ type:'text', nullable: true })
    image: string;

    @Column({ type:'bigint', nullable: true })
    image_id: number;

    @Column({ type:'text', nullable: true })
    pdf: string;

    @Column({ type:'bigint', nullable: true })
    pdf_id: number;
    
    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    created_at: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modified_at: Date;

    @OneToMany(() => FittingsPipesJointingDetails, (details) => details.ductile_fittings_pipes_jointing, { cascade: true })
    details: FittingsPipesJointingDetails[];
}
