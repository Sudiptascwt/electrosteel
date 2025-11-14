import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    IntegerType,
  } from 'typeorm';
  
  @Entity('inner_features')
  export class InnerFeature {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255 })
    feature_title: string;
  
    @Column({ type: 'longtext', nullable: true })
    description?: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    video?: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    modified_at: Date;
  }
  