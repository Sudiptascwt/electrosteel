import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { PipesJointingDetails } from "./pipes_jointing_details.entity";

@Entity('pipes_jointing')
export class PipesJointing {
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

    @Column({ type:'text', nullable: true })
    pdf: string

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1, // 1 = Active, 0 = Inactive
    })
    status: number;
    
    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    created_at: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modified_at: Date;

    @OneToMany(() => PipesJointingDetails, (details) => details.pipes_jointing, { cascade: true })
    details: PipesJointingDetails[];
}
