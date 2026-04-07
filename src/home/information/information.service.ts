import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Information } from '../../entity/information.entity';
import { InformationDto } from '../../dto/information.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class InformationService {
  constructor(
    @InjectRepository(Information)
    private readonly repo: Repository<Information>,
  ) {}

  // CREATE
  async create(dto: InformationDto, files?: any) {
    const entity = this.repo.create({
      ...dto,
      icon_image: files?.icon_image ? files.icon_image[0].filename : null,
      video_image: files?.video_image ? files.video_image[0].filename : null,
    });

    const saved = await this.repo.save(entity);
    return {
      statusCode: 201,
      message: 'Information created successfully',
      data: saved,
    };
  }

  // UPDATE
  async update(id: number, dto: InformationDto, files?: any) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Information with ID ${id} not found`);
    }

    Object.assign(entity, dto);

    if (files?.icon_image) {
      // Delete old file
      if (entity.icon_image) {
        const oldPath = path.join('./uploads', entity.icon_image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      entity.icon_image = files.icon_image[0].filename;
    }

    if (files?.video_image) {
      if (entity.video_image) {
        const oldPath = path.join('./uploads', entity.video_image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      entity.video_image = files.video_image[0].filename;
    }

    const updated = await this.repo.save(entity);
    return {
      statusCode: 200,
      message: 'Information updated successfully',
      data: updated,
    };
  }

  // GET BY ID
  async getById(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Information with ID ${id} not found`);
    }
    return {
      statusCode: 200,
      data: entity,
    };
  }

  // GET ALL
  async getAll() {
    const entities = await this.repo.find({ order: { created_at: 'DESC' } });
    return {
      statusCode: 200,
      data: entities,
    };
  }

  // DELETE
  async delete(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Information with ID ${id} not found`);
    }

    // Delete files if exist
    if (entity.icon_image) {
      const oldPath = path.join('./uploads', entity.icon_image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    if (entity.video_image) {
      const oldPath = path.join('./uploads', entity.video_image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await this.repo.delete(id);
    return {
      statusCode: 200,
      message: 'Information deleted successfully',
    };
  }
}
