import {Entity,PrimaryGeneratedColumn,Column,UpdateDateColumn} from "typeorm";

@Entity('other_disclosure')
export class OtherDisclosure {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'text', nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    pdf: string;

    @Column({ type: 'bigint', nullable: true })
    pdf_id: number;

    @UpdateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modifiedAt: Date;
}
