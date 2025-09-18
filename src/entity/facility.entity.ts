import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('facility')
export class Facility {
    @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    title: string;

    @Column({ type: 'longtext', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    div_id: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modifiedAt: Date;
}
