import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('all_products') 
export class AllProducts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'text', nullable: true })
    category: string;

    @Column({ type:'text', nullable: true })
    title: string;

    @Column({ type:'text', nullable: true })
    description: string;

    @Column({ type:'text' })
    image: string;

    @Column({ type:'text' })
    slider_images: string;

    @Column({ type: 'text', nullable: true })
    url: string;

    @Column({ type: 'text', nullable: true })
    download_link: string;

    @Column({ type: 'text', nullable: true })
    video_link: string;

    @Column({ type: 'longtext', nullable: true })
    table_headers: string;  // Store JSON string

    @Column({ type: 'longtext', nullable: true })
    table_data: string;  // Store JSON string

    @Column({ type: 'longtext', nullable: true })
    table_data2: string;  // Store JSON string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
