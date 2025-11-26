import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from '../../entity/home_testimonial.entity';
import { TestimonialDto } from '../../dto/home_testimonial.dto';

@Injectable()
export class TestimonialService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly repo: Repository<Testimonial>,
  ) {}

  /**
   * Create a new testimonial
   */
  async create(data: TestimonialDto) {
    const section = this.repo.create(data);
    const saved = await this.repo.save(section);

    return {
      status: true,
      statusCode: 201,
      message: 'Testimonial created successfully',
      data: saved,
    };
  }

  /**
   * Update testimonial by ID
   */
  async update(id: number, data: Partial<TestimonialDto>) {
    const section = await this.repo.findOne({ where: { id,status: 0 } });

    if (!section) {
      return {
        status: false,
        statusCode: 404,
        message: 'Testimonial not found',
        data: [],
      };
    }

    Object.assign(section, data);
    const saved = await this.repo.save(section);

    return {
      status: true,
      statusCode: 200,
      message: 'Testimonial updated successfully',
      data: saved,
    };
  }

  /**
   * Get all testimonials
   */
  async getAll() {
    const sections = await this.repo.find({ 
      where: { status: 1 },
      order: { created_at: 'DESC' } 
    });

    return {
      status: true,
      statusCode: 200,
      message: sections.length ? 'Testimonials fetched successfully' : 'No testimonials found',
      data: sections,
    };
  }

  /**
   * Get testimonial by ID
   */
  async getById(id: number) {
    const section = await this.repo.findOne({ where: { id, status: 1 } });

    if (!section) {
      return {
        status: false,
        statusCode: 404,
        message: 'Testimonial not found',
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Testimonial fetched successfully',
      data: [section],
    };
  }

  /**
   * Delete testimonial by ID
   */
  async delete(id: number) {
    const result = await this.repo.update(
      { id },      
      { status: 0 }
    );

    if (result.affected === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'Testimonial not found',
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Testimonial deleted successfully',
      data: [],
    };
  }
}
