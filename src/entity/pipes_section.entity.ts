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
    pipes_laid_description: string;

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
