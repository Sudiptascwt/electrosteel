import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('ductile_iron_fittings_details') 
export class DuctileIronFittingsDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'text', nullable: false })
    main_title: string;

    @Column({ type:'text', nullable: true })
    sub_title: string;

    @Column({ type: 'longtext', nullable: true })
    properties: string;

    @Column({ type:'longtext', nullable: true }) //multiple images will be used using comma separator
    images: string;

    @Column({ type:'bigint', nullable:true })
    images_id: number;

    @Column({ type: 'longtext', nullable: true }) //multiple images will be used using comma separator
    below_images: string;

    @Column({ type: 'bigint', nullable: true })
    below_images_id: number;

    @Column({
      type: 'tinyint',
      default: 1,
    })
    status: 0 | 1; 

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;
}
