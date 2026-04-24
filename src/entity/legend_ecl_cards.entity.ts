import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('legend_ecl_cards')
export class LegendEclCard {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    image: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;
}