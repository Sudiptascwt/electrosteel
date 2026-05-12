import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Milestone } from './milestones.entity';

@Entity('headings')
export class headings {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    sub_title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    section_type: string;

    @Column({ type: 'text', nullable: true })
    image: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}