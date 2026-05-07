// entities/protection-external.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('protection_external')
export class ProtectionExternal extends BaseEntity {
    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'longtext', nullable: true })
    table: string; // JSON string for the table data
}