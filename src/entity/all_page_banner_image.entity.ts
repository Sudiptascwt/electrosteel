import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('all_pages_banner_image')
export class AllBanner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext', nullable: true })
  page_name: string;

  @Column({ type: 'longtext', nullable: true })
  page_sub_name: string;

  @Column({ type: 'longtext', nullable: true })
  meta_key: string;

  @Column({ type: 'longtext', nullable: true })
  meta_value: string;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: 0 | 1; 
}
