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

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1, // 1 = Active, 0 = Inactive
    })
    status: number;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modifiedAt: Date;
}
