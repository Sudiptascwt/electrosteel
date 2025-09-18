import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('social_platforms') 
export class SocialPlatform {
  @PrimaryGeneratedColumn()
id: number;

  @Column({ type: 'longtext', nullable: true })
  instagram: string;

  @Column({ type: 'longtext', nullable: true })
  linkedin: string;

  @Column({ type: 'longtext', nullable: true })
  twitter: string;

  @Column({ type: 'longtext', nullable: true })
  youtube: string;

  @Column({ type: 'longtext', nullable: true })
  facebook: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
