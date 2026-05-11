// // entities/application.entity.ts
// import { Entity, Column } from 'typeorm';
// import { BaseEntity } from './base.entity';

// @Entity('application')
// export class Application extends BaseEntity {
//     @Column({ type: 'text', nullable: true })
//     title: string;

//     @Column({ type: 'longtext', nullable: true })
//     listData: string; // JSON string for the two-column list
// }

// entities/application.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('application')
export class Application extends BaseEntity {
    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    image1: string;

    @Column({ type: 'text', nullable: true })
    image2: string;

    @Column({ type: 'longtext', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    icon: string;
}