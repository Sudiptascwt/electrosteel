import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('milestones')
export class Milestone {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    // @Column({ type: 'varchar', length: 255, nullable: true })
    // name: string;

    // @Column({ type: 'varchar', length: 255, nullable: true })
    // title: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    year: string;

    @Column({ type: 'longtext', nullable: true })
    description: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modifiedAt: Date;
}
