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

    @Column({
      type: 'tinyint',
      default: 1,
    })
    status: 0 | 1;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    modified_at: Date;
  }
  