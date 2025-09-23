import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    IntegerType,
  } from 'typeorm';
  
  @Entity('investor_relation')
  export class InvestorRelation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    heading: number;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    alt_email: string;

    @Column({ type: 'longtext', nullable: true })
    address: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    modified_at: Date;
  }
  