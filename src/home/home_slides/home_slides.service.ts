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

  /**
   * Save Slide (Create OR Update)
   * If id is provided: Delete existing slide first, then create new
   * If no id: Create new slide
   */
  async saveSlide(data: any) {
    // If ID exists, delete the existing slide first
    if (data.id) {
      const existingSlide = await this.slidesRepository.findOne({
        where: { id: data.id }
      });

      if (existingSlide) {
        // Delete old file if exists
        if (existingSlide.src) {
          const oldFilePath = path.join('./uploads/slides', existingSlide.src);
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
        
        // Delete the existing record
        await this.slidesRepository.delete(data.id);
      }
    }

    // Prepare data for new slide
    const newSlideData = {
      title: data.title,
      type: data.type,
      src: data.src,
      highlight: data.highlight,
      url: data.url,
      name: data.name,
      style: data.style,
    };
    
    // Create new slide
    const newSlide = this.slidesRepository.create(newSlideData);
    const savedSlide = await this.slidesRepository.save(newSlide);

    return {
      status: true,
      statusCode: data.id ? 200 : 201,
      message: data.id ? 'Slide updated successfully.' : 'Slide created successfully.',
      data: savedSlide,
    };
  }

  /**
   * Get all Slides
   */
  async getAllSlides() {
    const slides = await this.slidesRepository.find({
      order: { id: 'DESC' }
    });

    return {
      status: true,
      statusCode: 200,
      message: slides.length ? 'Slides fetched successfully.' : 'No slides found.',
      data: slides,
    };
  }

  /**
   * Get single Slide by ID
   */
  async getSlideById(id: number) {
    const slide = await this.slidesRepository.findOne({
      where: { id }
    });

    if (!slide) {
      return {
        status: false,
        statusCode: 404,
        message: `Slide with ID ${id} not found.`,
        data: null,
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Slide fetched successfully.',
      data: slide,
    };
  }

  /**
   * Delete Slide by ID
   */
  async deleteSlide(id: number) {
    const slide = await this.slidesRepository.findOne({
      where: { id }
    });

    if (!slide) {
      return {
        status: false,
        statusCode: 404,
        message: `Slide with ID ${id} not found.`,
        data: null,
      };
    }

    // Delete the uploaded file
    if (slide.src) {
      const filePath = path.join('./uploads/slides', slide.src);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from database
    await this.slidesRepository.delete(id);

    return {
      status: true,
      statusCode: 200,
      message: 'Slide deleted successfully.',
      data: null,
    };
  }
}