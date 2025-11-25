import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,UpdateDateColumn} from "typeorm";

@Entity('voting_results')
export class VotingResults {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'varchar', length:'255', nullable: false })
    start_date: string;

    @Column({ type: 'varchar', length:'255', nullable: false })
    end_date: string;

    @Column({ type: 'text', nullable: false })
    title: string;  

    @Column({ type: 'text', nullable: true })
    pdf: string;

    @Column({ type:'bigint', nullable: true })
    pdf_id: number;

    @Column({
      type: 'tinyint',
      width: 1,
      default: 1, // 1 = Active, 0 = Inactive
    })
    status: number;

    @UpdateDateColumn({ name: 'created_at', type: 'datetime' })
    createddAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modifiedAt: Date;
}
