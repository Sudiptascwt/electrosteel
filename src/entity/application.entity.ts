// entities/application.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('application')
export class Application extends BaseEntity {
    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'longtext', nullable: true })
    listData: string; // JSON string for the two-column list
}