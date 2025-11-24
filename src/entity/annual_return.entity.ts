import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('annual_return') 
export class AnnualReturn {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'text' })
    title: string;

    @Column({ type:'text' })
    pdf: string;

    @Column({ type:'bigint', nullable: true })
    pdf_id: number;

    @Column({
        type: 'tinyint',
        default: 1,
    })
    status: 0 | 1; 

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

