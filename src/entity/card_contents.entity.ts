import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
// entity/card-content.entity.ts
@Entity('card_contents')
export class CardContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sectionId: string; // e.g., 'campus-hire-stories', 'employee-testimonials'

  @Column()
  cardType: string; // 'image-content-square'

  @Column({ type: 'text' })
  content: string;

  @Column()
  image_url: string;

  @Column()
  image_alt: string;

  @Column({ default: 0 })
  order: number;

  @Column({ default: true })
  is_active : boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}