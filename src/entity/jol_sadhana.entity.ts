import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('jol_sadhana')
export class Jolsadhana {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'text', nullable: true })
    meta_key: string;

    @Column({ type: 'longtext', nullable: true })
    meta_value: string;

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
