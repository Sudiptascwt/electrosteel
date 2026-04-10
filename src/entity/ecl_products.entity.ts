import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('ecl_products')
export class ecl_products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    label: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    sublabel: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    icon: string;

    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    properties: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    btnLink: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}