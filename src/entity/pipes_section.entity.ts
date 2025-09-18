import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('pipes_section')
export class ProductBrochures {
    @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

    @Column({ type: 'longtext', nullable: true })
    title: string;

    @Column({ type: 'longtext', nullable: true })
    description: string;

    @Column({ type:'longtext'})
    pipes_laid_description: string
    
    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modifiedAt: Date;
}
