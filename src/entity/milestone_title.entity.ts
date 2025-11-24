import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Milestone } from './milestone.entity';

@Entity('milestones_title')
export class MilestoneTitle {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'text', nullable: true })
    name1: string;

    @Column({ type: 'text', nullable: true })
    name2: string;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1, // 1 = Active, 0 = Inactive
    })
    status: number;

    @OneToMany(() => Milestone, (m) => m.titleGroup, { cascade: true, eager: true })
    milestones: Milestone[];

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modifiedAt: Date;
}
