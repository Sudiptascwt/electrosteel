import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('meta_tags')
export class MetaTag {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'longtext', nullable: true })
    meta_title: string;

    @Column({ type: 'longtext', nullable: true })
    meta_keyword: string;

    @Column({ type: 'longtext', nullable: true })
    meta_description: string;

    @Column({ type: 'longtext', nullable: true })
    page_name: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: true })
    modifiedAt: Date;
}
