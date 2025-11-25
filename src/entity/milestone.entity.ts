import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { MilestoneTitle } from './milestone_title.entity';

@Entity('milestones')
export class Milestone {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    // @Column({ type: 'varchar', length: 255, nullable: true })
    // name: string;

    @Column({ type: 'text', nullable: true })
    title: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    year: string;

    @Column({ type: 'longtext', nullable: true })
    description: string;

    @Column({ type: 'longtext', nullable: true })
    image: string;

    @Column({ type: 'bigint', nullable: true })
    image_id: number;

    @Column({
      type: 'tinyint',
      width: 1,
      default: 1, // 1 = Active, 0 = Inactive
    })
    status: number;

      // FK to milestones_title
    @ManyToOne(() => MilestoneTitle, (group) => group.milestones, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'title_id' })
    titleGroup: MilestoneTitle;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'modified_at', type: 'datetime' })
    modifiedAt: Date;
}
