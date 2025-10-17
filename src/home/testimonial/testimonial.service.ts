import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  Testimonial } from '../../entity/home_testimonial.entity';
import {  TestimonialDto } from '../../dto/home_testimonial.dto';

@Injectable()
export class   TestimonialService {
  constructor(
    @InjectRepository(  Testimonial)
    private readonly repo: Repository<  Testimonial>,
  ) {}

  async create(data:   TestimonialDto) {
    const section = this.repo.create(data);
    const saved = await this.repo.save(section);
    return { statusCode: 201, message: 'Testimonial created successfully', data: saved };
  }

  async update(id: number, data: Partial<  TestimonialDto>) {
    const section = await this.repo.findOne({ where: { id } });
    if (!section) throw new NotFoundException('Section not found');
    Object.assign(section, data);
    const saved = await this.repo.save(section);
    return { statusCode: 200, message: 'Testimonial updated successfully', data: saved };
  }

  async getAll() {
    const sections = await this.repo.find({ order: { created_at: 'DESC' } });
    return { statusCode: 200, message: 'Testimonials fetched successfully', data: sections };
  }

  async getById(id: number) {
    const section = await this.repo.findOne({ where: { id } });
    if (!section) throw new NotFoundException('Section not found');
    return { statusCode: 200, message: 'Testimonial fetched successfully', data: section };
  }

  async delete(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Section not found');
    return { statusCode: 200, message: 'Testimonial deleted successfully' };
  }
}
