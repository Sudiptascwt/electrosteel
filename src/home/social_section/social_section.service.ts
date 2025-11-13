import { Injectable } from '@nestjs/common';
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

  /**
   * Create a new social section
   */
  async create(data: SocialSectionDto) {
    const section = this.repo.create(data);
    const saved = await this.repo.save(section);

    return {
      status: true,
      statusCode: 201,
      message: 'Section created successfully',
      data: saved,
    };
  }

  /**
   * Update social section by ID
   */
  async update(id: number, data: Partial<SocialSectionDto>) {
    const section = await this.repo.findOne({ where: { id } });

    if (!section) {
      return {
        status: false,
        statusCode: 404,
        message: 'Section not found',
        data: [],
      };
    }

    Object.assign(section, data);
    const saved = await this.repo.save(section);

    return {
      status: true,
      statusCode: 200,
      message: 'Section updated successfully',
      data: saved,
    };
  }

  /**
   * Get all social sections
   */
  async getAll() {
    const sections = await this.repo.find({ order: { created_at: 'DESC' } });

    return {
      status: true,
      statusCode: 200,
      message: sections.length ? 'Sections fetched successfully' : 'No sections found',
      data: sections,
    };
  }

  /**
   * Get social section by ID
   */
  async getById(id: number) {
    const section = await this.repo.findOne({ where: { id } });

    if (!section) {
      return {
        status: false,
        statusCode: 404,
        message: 'Section not found',
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Section fetched successfully',
      data: [section],
    };
  }

  /**
   * Delete social section by ID
   */
  async delete(id: number) {
    const result = await this.repo.delete(id);

    if (result.affected === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'Section not found',
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Section deleted successfully',
      data: [],
    };
  }
}
