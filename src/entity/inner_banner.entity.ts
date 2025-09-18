import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('inner_banners')
  export class InnerBanner {
    @PrimaryGeneratedColumn()
  id: number;
  
    @Column({ type: 'varchar', length: 255 })
    banner_title: string;
  
    @Column({ type: 'longtext', nullable: true })
    description?: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    banner_image?: string;
  
    @Column({ type: 'longtext', nullable: true })
    banner_sub_title?: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    banner_sub_image?: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    banner_video?: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    video_title?: string;
  
    @Column({ type: 'longtext', nullable: true })
    video_description?: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    sliding_title?: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    sliding_image?: string;
  
    @Column({ type: 'longtext', nullable: true })
    sliding_description?: string;
  
    @Column({ type: 'longtext', nullable: true })
    sliding_address?: string;
  
    @Column({ type: 'tinyint', default: 1 })
    status: number;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    modified_at: Date;
  }
  