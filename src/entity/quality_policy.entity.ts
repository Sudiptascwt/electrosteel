import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('quality_policy') 
export class QualityPolicy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'text',nullable: true })
    pdf: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
