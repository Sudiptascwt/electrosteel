import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { home_slides } from '../../entity/home_slides.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class HomeSlidesService {
  constructor(
    @InjectRepository(home_slides)
    private readonly slidesRepository: Repository<home_slides>,
  ) {}

  async saveSlide(data: any) {
    if (!data) {
      throw new Error("No data received");
    }

    const existingSlide = await this.slidesRepository.findOne({
      where: {},
    });

    if (existingSlide) {
      if (existingSlide.src) {
        const oldFilePath = path.join('./uploads/slides', existingSlide.src);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      await this.slidesRepository.delete(existingSlide.id);
    }

    const newSlide = this.slidesRepository.create({
      title: data.title,
      type: data.type,
      src: data.src,
      highlight: data.highlight,
      url: data.url,
    });

    const savedSlide = await this.slidesRepository.save(newSlide);

    return {
      status: true,
      statusCode: existingSlide ? 200 : 201,
      message: existingSlide
        ? 'Slide updated successfully.'
        : 'Slide created successfully.',
      data: savedSlide,
    };
  }

  async getAllSlides() {
    const slides = await this.slidesRepository.find({
    });

    return {
      status: true,
      statusCode: 200,
      message: slides.length ? 'Slides fetched successfully.' : 'No slides found.',
      data: slides,
    };
  }
}