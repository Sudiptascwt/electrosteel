import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('credit_ratings') 
export class CreditRatings {
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