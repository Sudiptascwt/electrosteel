import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionElectrosteel } from '../../entity/section_electrosteel.entity';
import { SectionElectrosteelDto } from '../../dto/section_electrosteel.dto';

@Injectable()
export class SectionElectrosteelService {
  constructor(
    @InjectRepository(SectionElectrosteel)
    private readonly repo: Repository<SectionElectrosteel>,
  ) {}

  /**
   * Create a new section
   */
  async create(data: SectionElectrosteelDto) {
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
   * Update section by ID
   */
  async update(id: number, data: Partial<SectionElectrosteelDto>) {
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
   * Get all sections
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
   * Get section by ID
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
   * Delete section by ID
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
