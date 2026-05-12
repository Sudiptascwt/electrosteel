// entities/jointing-systems.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('jointing_systems')
export class JointingSystems extends BaseEntity {
    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'longtext', nullable: true })
    systems: string; // JSON string for array of jointing systems

    @Column({ type: 'varchar', length: 255, nullable: true })
    category: string;
}