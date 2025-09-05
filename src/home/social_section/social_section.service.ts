import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialSection } from '../../entity/social_section.entity';
import { SocialSectionDto } from '../../dto/social_section.dto';

@Injectable()
export class SocialSectionService {
  constructor(
    @InjectRepository(SocialSection)
    private readonly repo: Repository<SocialSection>,
  ) {}

  async create(data: SocialSectionDto) {
    const section = this.repo.create(data);
    const saved = await this.repo.save(section);
    return { statusCode: 201, message: 'Section created successfully', data: saved };
  }

  async update(id: number, data: Partial<SocialSectionDto>) {
    const section = await this.repo.findOne({ where: { id } });
    if (!section) throw new NotFoundException('Section not found');
    Object.assign(section, data);
    const saved = await this.repo.save(section);
    return { statusCode: 200, message: 'Section updated successfully', data: saved };
  }

  async getAll() {
    const sections = await this.repo.find({ order: { created_at: 'DESC' } });
    return { statusCode: 200, message: 'Sections fetched successfully', data: sections };
  }

  async getById(id: number) {
    const section = await this.repo.findOne({ where: { id } });
    if (!section) throw new NotFoundException('Section not found');
    return { statusCode: 200, message: 'Section fetched successfully', data: section };
  }

  async delete(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Section not found');
    return { statusCode: 200, message: 'Section deleted successfully' };
  }
}
