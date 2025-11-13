import { Injectable } from '@nestjs/common';
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

  /**
   * Create a new video section
   */
  async create(data: VideoSectionDto) {
    const section = this.repo.create(data);
    const saved = await this.repo.save(section);

    return {
      status: true,
      statusCode: 201,
      message: 'Video Section created successfully',
      data: saved,
    };
  }

  /**
   * Update video section by ID
   */
  async update(id: number, data: Partial<VideoSectionDto>) {
    const section = await this.repo.findOne({ where: { id } });

    if (!section) {
      return {
        status: false,
        statusCode: 404,
        message: 'Video Section not found',
        data: [],
      };
    }

    Object.assign(section, data);
    const saved = await this.repo.save(section);

    return {
      status: true,
      statusCode: 200,
      message: 'Video Section updated successfully',
      data: saved,
    };
  }

  /**
   * Get all video sections
   */
  async getAll() {
    const sections = await this.repo.find({ order: { created_at: 'DESC' } });

    return {
      status: true,
      statusCode: 200,
      message: sections.length
        ? 'Video Sections fetched successfully'
        : 'No video sections found',
      data: sections,
    };
  }

  /**
   * Get single video section by ID
   */
  async getById(id: number) {
    const section = await this.repo.findOne({ where: { id } });

    if (!section) {
      return {
        status: false,
        statusCode: 404,
        message: 'Video Section not found',
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Video Section fetched successfully',
      data: [section],
    };
  }

  /**
   * Delete video section by ID
   */
  async delete(id: number) {
    const result = await this.repo.delete(id);

    if (result.affected === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'Video Section not found',
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Video Section deleted successfully',
      data: [],
    };
  }
}
