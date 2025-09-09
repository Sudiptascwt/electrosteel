import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('meta_tags')
export class MetaTag {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'text', nullable: true })
    meta_title: string;

    @Column({ type: 'text', nullable: true })
    meta_keyword: string;

    @Column({ type: 'text', nullable: true })
    meta_description: string;

    @Column({ type: 'text', nullable: true })
    page_name: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: true })
    modifiedAt: Date;
}
