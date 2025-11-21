// milestone.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, DataSource } from 'typeorm';
import { MilestoneTitle } from '../../entity/milestone_title.entity'
import { Milestone } from '../../entity/milestone.entity';
import { MilestoneDto } from '../../dto/milestone.dto';
import { MilestoneTitleDto } from '../../dto/milestone_title.dto';

@Injectable()
export class MilestoneService {
  constructor(
    @InjectRepository(MilestoneTitle)
    private readonly milestoneTitleRepo: Repository<MilestoneTitle>,

    @InjectRepository(Milestone)
    private readonly milestoneRepo: Repository<Milestone>,

    private readonly dataSource: DataSource, // for transactions
  ) {}

  // CREATE parent + children in one transaction
  async createMilestone(data: MilestoneTitleDto) {
    if (!data?.milestones || !Array.isArray(data.milestones) || data.milestones.length === 0) {
      throw new BadRequestException('milestones array is required.');
    }

    // Validate duplicate years within request
    const years = data.milestones.map(m => m.year);
    const duplicates = years.filter((y, i) => years.indexOf(y) !== i);
    if (duplicates.length) {
      throw new BadRequestException(`Duplicate year(s) in payload: ${[...new Set(duplicates)].join(', ')}`);
    }

    // Check existing years in DB (optional)
    const existing = await this.milestoneRepo.find({ where: { year: In(years) }, select: ['year'] });
    if (existing.length) {
      const exists = existing.map(e => e.year).join(', ');
      throw new BadRequestException(`Milestone year(s) already exist: ${exists}`);
    }

    // Transactional save
    return await this.dataSource.transaction(async manager => {
      const titleEntity = manager.create(MilestoneTitle, {
        name1: data.name1,
        name2: data.name2,
        milestones: data.milestones.map(m => manager.create(Milestone, {
          title: m.title,
          year: m.year,
          description: m.description,
        })),
      });

      const saved = await manager.save(MilestoneTitle, titleEntity);

      return {
        status: true,
        statusCode: 201,
        message: 'Milestone group created successfully.',
        data: saved,
      };
    });
  }

  // UPDATE parent and replace children (simple strategy)
  async updateMilestoneGroup(id: number, data: MilestoneTitleDto) {
    const existingGroup = await this.milestoneTitleRepo.findOne({ where: { id }, relations: ['milestones'] });
    if (!existingGroup) {
      throw new NotFoundException({ message: `Milestone group with ID ${id} not found`, status: false });
    }

    // validate payload
    if (!data?.milestones || !Array.isArray(data.milestones)) {
      throw new BadRequestException('milestones array is required.');
    }
    const years = data.milestones.map(m => m.year);
    const duplicates = years.filter((y, i) => years.indexOf(y) !== i);
    if (duplicates.length) {
      throw new BadRequestException(`Duplicate year(s) in payload: ${[...new Set(duplicates)].join(', ')}`);
    }

    const existingOther = await this.milestoneRepo.createQueryBuilder('m')
      .where('m.year IN (:...years)', { years })
      .andWhere('m.title_id != :id', { id })
      .getMany();
    if (existingOther.length) {
      throw new BadRequestException(`Some milestone year(s) already exist in other groups: ${existingOther.map(e=>e.year).join(', ')}`);
    }

    return await this.dataSource.transaction(async manager => {
      // update parent fields
      existingGroup.name1 = data.name1 ?? existingGroup.name1;
      existingGroup.name2 = data.name2 ?? existingGroup.name2;
      await manager.save(MilestoneTitle, existingGroup);

      // delete existing children for this group (clean replace)
      await manager.createQueryBuilder()
        .delete()
        .from(Milestone)
        .where('title_id = :id', { id })
        .execute();

      // create new children
      const milestoneEntities = data.milestones.map(m => manager.create(Milestone, {
        title: m.title,
        year: m.year,
        description: m.description,
        titleGroup: existingGroup, // set relation
      }));

      await manager.save(Milestone, milestoneEntities);

      // reload group with children
      const reloaded = await manager.findOne(MilestoneTitle, { where: { id }, relations: ['milestones'] });

      return {
        status: true,
        statusCode: 200,
        message: 'Milestone group updated successfully.',
        data: reloaded,
      };
    });
  }

  // GET single group by id (with children)
  async getMilestoneGroupById(id: number) {
    const group = await this.milestoneTitleRepo.findOne({ where: { id }, relations: ['milestones'] });
    if (!group) {
      throw new NotFoundException({ message: `Milestone group with ID ${id} not found`, status: false });
    }
    return {
      status: true,
      statusCode: 200,
      message: 'Milestone group fetched successfully.',
      data: group,
    };
  }

  // GET all groups (with children)
  async getAllMilestoneGroups() {
    const groups = await this.milestoneTitleRepo.find({
      relations: ['milestones'],
      order: { createdAt: 'DESC' },
    });
    return {
      status: true,
      statusCode: 200,
      message: 'Milestone groups fetched successfully.',
      data: groups,
    };
  }

  // DELETE group (children deleted by FK ON DELETE CASCADE)
  async deleteMilestoneGroup(id: number) {
    const result = await this.milestoneTitleRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException({ message: `Milestone group with ID ${id} not found`, status: false });
    }
    return {
      status: true,
      statusCode: 200,
      message: 'Milestone group deleted successfully.',
    };
  }

  /* --- Optional: Single Milestone CRUD (if you still need them) --- */

  // create a single milestone under an existing group
  async createSingleMilestone(titleId: number, item: { title?: string; year: string; description?: string }) {
    const group = await this.milestoneTitleRepo.findOne({ where: { id: titleId } });
    if (!group) throw new NotFoundException('Parent group not found');

    // optional duplicate year check
    const exists = await this.milestoneRepo.findOne({ where: { year: item.year } });
    if (exists) throw new BadRequestException('Milestone year already exists');

    const m = this.milestoneRepo.create({ ...item, titleGroup: group });
    const saved = await this.milestoneRepo.save(m);
    return saved;
  }

}
