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

      // Convert to array (handling different formats)
      let items: any[] = [];
      
      if (Array.isArray(data)) {
          items = data;
      } else if (data && typeof data === 'object') {
          // Handle object with numeric keys (from spread operator)
          const values = Object.values(data);
          if (values.length > 0 && values[0] && typeof values[0] === 'object' && 
              ('title' in values[0] || 'type' in values[0])) {
              items = values;
          } 
          // Single object
          else if (data.title || data.type) {
              items = [data];
          }
      }
      
      if (items.length === 0) {
          throw new Error("No valid items to process");
      }
      
      // Validate each item
      for (let i = 0; i < items.length; i++) {
          const item = items[i];
          
          if (!item.title || item.title.trim() === '') {
              throw new Error(`Item ${i + 1}: Title is required`);
          }
          
          if (!item.type || !['image', 'video'].includes(item.type)) {
              throw new Error(`Item ${i + 1}: Type must be 'image' or 'video'. Received: "${item.type}"`);
          }
          
          if (!item.src || item.src.trim() === '') {
              throw new Error(`Item ${i + 1}: Source (src) is required`);
          }
      }

      // Get existing slides
      const existingSlides = await this.slidesRepository.find({
          order: { createdAt: 'ASC' }
      });

      // Delete old image/video files if replacing entire collection
      if (existingSlides.length > 0) {
          for (const slide of existingSlides) {
              if (slide.src) {
                  const oldFilePath = path.join('./uploads/slides', slide.src);
                  if (fs.existsSync(oldFilePath)) {
                      try {
                          fs.unlinkSync(oldFilePath);
                      } catch (error) {
                          console.error(`Failed to delete old file: ${oldFilePath}`, error);
                      }
                  }
              }
          }
          
          // Delete all existing records
          await this.slidesRepository.clear();
      }

      // Create new slides
      const newSlides = items.map(item => 
          this.slidesRepository.create({
              title: item.title.trim(),
              type: item.type,
              src: item.src,
              highlight: item.highlight || null,
              url: item.url || null,
          })
      );

      const savedSlides = await this.slidesRepository.save(newSlides);

      return {
          status: true,
          statusCode: existingSlides.length > 0 ? 200 : 201,
          message: existingSlides.length > 0
              ? `${savedSlides.length} slide(s) updated successfully.`
              : `${savedSlides.length} slide(s) created successfully.`,
          data: savedSlides,
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