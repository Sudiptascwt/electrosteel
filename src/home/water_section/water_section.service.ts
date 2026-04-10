import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {water_section } from '../../entity/water_section.entity';
import * as fs from 'fs';
import * as path from 'path';
// import {water_sectionDto } from '../../dto/water_section.dto';

@Injectable()
export class water_sectionService {
  constructor(
    @InjectRepository(water_section)
    private readonly water_sectionRepository: Repository<water_section>,
  ) {}

    async saveWaterSectionData(data: water_section) {
      if (!data) {
        throw new Error("No data received");
      }

      let existingwater_section = await this.water_sectionRepository.findOne({
        where: {},
      });
      
      if (existingwater_section) {
        await this.water_sectionRepository.update(
          existingwater_section.id, 
          {
            title: data.title,
            sub_title: data.sub_title,
            description: data.description,
            url: data.url,
            video: data.video
          }
        );
        var savedwater_section = await this.water_sectionRepository.findOne({
          where: { id: existingwater_section.id }
        });
      } else {
        const new_water_section = this.water_sectionRepository.create({
            title: data.title,
            sub_title: data.sub_title,
            description: data.description,
            url: data.url,
            video: data.video
        });
        var savedwater_section = await this.water_sectionRepository.save(new_water_section);
      }

      return {
        status: true,
        statusCode: existingwater_section ? 200 : 201,
        message: existingwater_section
          ? 'water_section updated successfully.'
          : 'water_section created successfully.',
        data: savedwater_section,
      };
    }

    async getWaterSectionData() {
    //   const water_section = await this.water_sectionRepository.find({});

    //   const parsedData = water_section.map(item => {
    //     let parsedBoxData = item.box_data;
        
    //     if (item.box_data && typeof item.box_data === 'string') {
    //       try {
    //         parsedBoxData = JSON.parse(item.box_data);
    //       } catch (e) {
    //         console.error('Failed to parse box_data:', e);
    //       }
    //     }
        
    //     return {
    //       id: item.id,
    //       title: item.title,
    //       sub_title: item.sub_title,
    //       box_data: parsedBoxData, 
    //       image: item.image,
    //       video: item.video,
    //       createdAt: item.createdAt,
    //       updatedAt: item.updatedAt,
    //     };
    //   });

    //   return {
    //     status: true,
    //     statusCode: 200,
    //     message: water_section.length 
    //       ? 'water_section fetched successfully.' 
    //       : 'No water_section found.',
    //     data: parsedData,
    //   };
  }
}