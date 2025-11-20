import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    IntegerType,
  } from 'typeorm';
  
  @Entity('investor_presentation')
  export class InvestorPresentation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    title: number;

    @Column({ type: 'text' })
    pdf: string;

    @Column({ type: 'bigint', nullable: true })
    pdf_id: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    modified_at: Date;
  }
  