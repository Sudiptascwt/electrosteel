// entities/protection-internal.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('protection_internal')
export class ProtectionInternal extends BaseEntity {
    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'longtext', nullable: true })
    table: string; // JSON string for the table data

    @Column({ type: 'varchar', length: 255, nullable: true })
    category: string;
}