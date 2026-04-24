import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('legend_ecl_videos')
export class LegendEclVideo {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'varchar', length: 500 })
    video_link: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;
}