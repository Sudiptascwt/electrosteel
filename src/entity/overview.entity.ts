// entities/overview.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('overview_ductile_iron_pipes')
export class OverviewDuctileIronPipes extends BaseEntity {
    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'longtext', nullable: true })
    description: string;

    @Column({ type: 'longtext', nullable: true })
    image: string;

    @Column({ type: 'longtext', nullable: true })
    tableData: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    category: string;
}