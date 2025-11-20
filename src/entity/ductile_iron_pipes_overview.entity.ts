import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('ductile_iron_pipes_overview') 
export class DuctileIronPipesOverview {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'text', nullable: false })
    main_title: string;

    @Column({ type:'text', nullable: true })
    sub_title: string;

    @Column({type: 'longtext', nullable: true })
    properties: string;

    @Column({ type:'longtext', nullable: true }) //multiple images will be used using comma separator
    images: string;

    @Column({ type:'bigint', nullable: true })
    images_id: number;

    @Column({ type: 'longtext', nullable: true }) //multiple images will be used using comma separator
    below_images: string;

    @Column({ type: 'bigint', nullable: true })
    below_images_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
