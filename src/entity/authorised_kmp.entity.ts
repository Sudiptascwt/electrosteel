import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('authorised_kmp') 
export class AuthorisedKmp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'text' })
    name: string;

    @Column({ type:'text' })
    post_name: string;

    @Column({ type:'varchar', length: 255 })
    email: string;

    @Column({ type:'text' })
    phone: string;

    @Column({ type:'text' })
    address: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
