import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('common_titles')
export class CommonTitle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'text'})
    title: string;

    @Column({type:'text'})
    sub_title: string;

    @Column({type:'text'})
    category: string;

    @Column({type:'text'})
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
