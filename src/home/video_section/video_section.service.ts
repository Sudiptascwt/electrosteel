import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoSection } from '../../entity/home_video_section.entity';
import { VideoSectionDto } from '../../dto/home_video_section.dto';

@Injectable()
export class VideoSectionService {
  constructor(
    @InjectRepository(VideoSection)
    private readonly repo: Repository<VideoSection>,
  ) {}

  async create(data: VideoSectionDto) {
    const section = this.repo.create(data);
    const saved = await this.repo.save(section);
    return { statusCode: 201, message: 'Video Section created successfully', data: saved };
  }

  async update(id: number, data: Partial<VideoSectionDto>) {
    const section = await this.repo.findOne({ where: { id } });
    if (!section) throw new NotFoundException('Section not found');
    Object.assign(section, data);
    const saved = await this.repo.save(section);
    return { statusCode: 200, message: 'Video Section updated successfully', data: saved };
  }

  async getAll() {
    const sections = await this.repo.find({ order: { created_at: 'DESC' } });
    return { statusCode: 200, message: 'Video Sections fetched successfully', data: sections };
  }

  async getById(id: number) {
    const section = await this.repo.findOne({ where: { id } });
    if (!section) throw new NotFoundException('Section not found');
    return { statusCode: 200, message: 'Video Section fetched successfully', data: section };
  }

  async delete(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Section not found');
    return { statusCode: 200, message: 'Video Section deleted successfully' };
  }
}
