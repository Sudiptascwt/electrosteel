import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('social_platforms') 
export class SocialPlatform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'text', nullable: true })
  instagram: string;

  @Column({ type:'text', nullable: true })
  linkedin: string;

  @Column({ type:'text', nullable: true })
  twitter: string;

  @Column({ type:'text', nullable: true })
  youtube: string;

  @Column({ type:'text', nullable: true })
  facebook: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
