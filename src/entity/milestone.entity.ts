import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('milestones')
export class Milestone {
    @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    title: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    year: string;

    @Column({ type: 'longtext', nullable: true })
    description: string;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1, // 1 = Active, 0 = Inactive
    })
    status: number;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modifiedAt: Date;
}
