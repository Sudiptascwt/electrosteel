import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('product_application_images')
export class product_application_images {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    title: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image: string;

    @Column({ type: 'bigint', nullable: true })
    image_id: number;

    @Column({
      type: 'tinyint',
      width: 1,
      default: 1, // 1 = Active, 0 = Inactive
    })
    status: number;

    @Column({
    type: 'enum',
    enum: ['application', 'overview'],
    default: 'application',
    })
    image_type: 'application' | 'overview';

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modifiedAt: Date;
}




















// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
//   ManyToOne,
//   JoinColumn,
// } from 'typeorm';
// import { product_applications } from './product-applications.entity';

// @Entity('product_application_images')
// export class ProductApplicationImages {
//   @PrimaryGeneratedColumn()
// id: number;

//   @Column()
//   application_id: number;

//   @ManyToOne(() => product_applications, (app) => app.id, {
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'application_id' })
//   productApplication: product_applications;

//   @Column({ type: 'varchar', length: 255 })
//   image_url: string;

//   @Column({
//     type: 'enum',
//     enum: ['application', 'overview'],
//     default: 'application',
//   })
//   image_type: 'application' | 'overview';

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;
// }

