import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('employment_form')
export class EmploymentForm {
    @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

    @Column({ type: 'longtext' })
    pdf: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modifiedAt: Date;
}
