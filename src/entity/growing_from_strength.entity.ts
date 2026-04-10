import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('growing_from_strength')
export class growing_from_strength {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    sub_title: string;

    @Column({ type: 'text', nullable: true })
    box_data: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    video: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}