import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('annual_return') 
export class AnnualReturn {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'text' })
    title: string;

    @Column({ type:'text' })
    pdf: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

