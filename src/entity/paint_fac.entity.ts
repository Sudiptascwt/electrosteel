// src/fac/entities/fac.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fac')
export class Fac {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Industrial Paint Business Overview' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'json' })
  card: CardItem[];
}

export interface CardItem {
  title: string;
  desc: string;
}