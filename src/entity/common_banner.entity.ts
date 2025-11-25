import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('common_banner')
export class CommonBanner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', length:'255'})
  page_name: string;

  @Column({type:'text'})
  meta_key: string;

  @Column({type:'longtext'})
  meta_value: string;
  
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
