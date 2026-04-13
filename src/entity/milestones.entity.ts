import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { headings } from './headings.entity';

@Entity()
export class Milestone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    year: string;

    @Column()
    heading: string;

    @Column()
    image: string;

    @Column({ type: 'text' })
    description: string;

    // @ManyToOne(() => headings, (headings) => headings.milestones, {
    //     onDelete: 'SET NULL', 
    // })
    // headings: headings;
}
