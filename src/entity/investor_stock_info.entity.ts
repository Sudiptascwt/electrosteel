import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    IntegerType,
  } from 'typeorm';
  
  @Entity('investor_stock_info')
  export class InvestorStockInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    address: string;

    @Column({ type: 'varchar', length: 255 })
    stock_code: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    modified_at: Date;
  }
  