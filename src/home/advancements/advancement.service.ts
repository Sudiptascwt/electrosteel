import { Injectable, NotFoundException } from '@nestjs/common';
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

  // CREATE
  async createAdvancement(data: AdvancementDto) {
    const existing = await this.advancementRepository.findOne({ where: { title: data.title } });
    if (existing) {
      return {
        statusCode: 400,
        message: `Advancement with title "${data.title}" already exists.`,
      };
    }

    const newAdvancement = this.advancementRepository.create(data);
    await this.advancementRepository.save(newAdvancement);

    return {
      statusCode: 201,
      message: 'Advancement created successfully.',
      data: newAdvancement,
    };
  }


  // UPDATE
  async updateAdvancement(id: number, data: AdvancementDto) {
    const advancement = await this.advancementRepository.findOne({ where: { id } });
    if (!advancement) {
      throw new NotFoundException(`Advancement with ID ${id} not found`);
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
      statusCode: 200,
      message: 'Advancement updated successfully.',
      data: updatedAdvancement,
    };
  }

  // GET ALL
  async getAllAdvancements() {
    const advancements = await this.advancementRepository.find();
    return {
      statusCode: 200,
      data: advancements,
    };
  }

  // GET ONE
  async getAdvancementById(id: number) {
    const advancement = await this.advancementRepository.findOne({ where: { id } });

    if (!advancement) {
      throw new NotFoundException(`Advancement with ID ${id} not found`);
    }

    return {
      statusCode: 200,
      data: advancement,
    };
  }

  // DELETE
  async deleteAdvancement(id: number) {
    const advancement = await this.advancementRepository.findOne({ where: { id } });

    if (!advancement) {
      throw new NotFoundException(`Advancement with ID ${id} not found`);
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
      statusCode: 200,
      message: 'Advancement deleted successfully.',
    };
  }
}
