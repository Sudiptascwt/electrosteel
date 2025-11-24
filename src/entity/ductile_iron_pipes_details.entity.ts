import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('ductile_iron_pipes_details') 
export class DuctileIronPipeDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'text', nullable: false })
    title: string;

    @Column({ type:'longtext', nullable: true })
    dimension: string;

    @Column({type: 'longtext', nullable: true })
    pressure_class: string;

    @Column({
        type: 'tinyint',
        default: 1,
    })
    status: 0 | 1; 

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
