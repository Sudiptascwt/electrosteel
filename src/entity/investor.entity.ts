import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('investors')
export class Investor {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'text', nullable: true })
    category: string;

    @Column({type: 'varchar', length:255, nullable: true })
    year: string;   // FY 2025 - 26

    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    date: string;

    @Column({ type: 'text', nullable: true })
    src: string;

    @Column({ type: 'varchar', length:255, nullable: true  })
    src_type: string;

    @Column({ type: 'int', default: 0 })
    is_latest: number;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modifiedAt: Date;
}
