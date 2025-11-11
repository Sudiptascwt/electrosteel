import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdvancementDto } from '../../dto/advancement.dto';
import { Advancement } from '../../entity/advancement.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AdvancementService {
  constructor(
    @InjectRepository(Advancement)
    private readonly advancementRepository: Repository<Advancement>,
  ) {}

  /**
   * Create a new Advancement
   */
  async createAdvancement(data: AdvancementDto) {
    const existing = await this.advancementRepository.findOne({ where: { title: data.title } });

    if (existing) {
      return {
        status: false,
        statusCode: 400,
        message: `Advancement with title "${data.title}" already exists.`,
        data: [],
      };
    }

    const newAdvancement = this.advancementRepository.create(data);
    const savedAdvancement = await this.advancementRepository.save(newAdvancement);

    return {
      status: true,
      statusCode: 201,
      message: 'Advancement created successfully.',
      data: savedAdvancement,
    };
  }

  /**
   * Update an existing Advancement
   */
  async updateAdvancement(id: number, data: AdvancementDto) {
    const advancement = await this.advancementRepository.findOne({ where: { id } });

    if (!advancement) {
      return {
        status: false,
        statusCode: 404,
        message: `Advancement with ID ${id} not found.`,
        data: [],
      };
    }

    // Remove old files if new files are uploaded
    if (data.image && advancement.image) {
      const oldImagePath = path.join('./uploads', advancement.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }
    if (data.pdf && advancement.pdf) {
      const oldPdfPath = path.join('./uploads', advancement.pdf);
      if (fs.existsSync(oldPdfPath)) fs.unlinkSync(oldPdfPath);
    }

    Object.assign(advancement, data);
    const updatedAdvancement = await this.advancementRepository.save(advancement);

    return {
      status: true,
      statusCode: 200,
      message: 'Advancement updated successfully.',
      data: updatedAdvancement,
    };
  }

  /**
   * Get all Advancements
   */
  async getAllAdvancements() {
    const advancements = await this.advancementRepository.find({ order: { id: 'DESC' } });

    return {
      status: true,
      statusCode: 200,
      message: advancements.length
        ? 'Advancements fetched successfully.'
        : 'No advancements found.',
      data: advancements,
    };
  }

  /**
   * Get single Advancement by ID
   */
  async getAdvancementById(id: number) {
    const advancement = await this.advancementRepository.findOne({ where: { id } });

    if (!advancement) {
      return {
        status: false,
        statusCode: 404,
        message: `Advancement with ID ${id} not found.`,
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Advancement fetched successfully.',
      data: [advancement],
    };
  }

  /**
   * Delete an Advancement by ID
   */
  async deleteAdvancement(id: number) {
    const advancement = await this.advancementRepository.findOne({ where: { id } });

    if (!advancement) {
      return {
        status: false,
        statusCode: 404,
        message: `Advancement with ID ${id} not found.`,
        data: [],
      };
    }

    // Remove uploaded files
    if (advancement.image) {
      const imagePath = path.join('./uploads', advancement.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
    if (advancement.pdf) {
      const pdfPath = path.join('./uploads', advancement.pdf);
      if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
    }

    await this.advancementRepository.delete(id);

    return {
      status: true,
      statusCode: 200,
      message: 'Advancement deleted successfully.',
      data: [],
    };
  }
}
