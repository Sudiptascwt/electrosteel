import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {growing_from_strength } from '../../entity/growing_from_strength.entity';
import * as fs from 'fs';
import * as path from 'path';
import {growing_from_strengthDto } from '../../dto/growing_from_strength.dto';

@Injectable()
export class growing_from_strengthService {
  constructor(
    @InjectRepository(growing_from_strength)
    private readonly growing_from_strengthRepository: Repository<growing_from_strength>,
  ) {}

    async saveGrowingStrengthData(data: growing_from_strength) {
      if (!data) {
        throw new Error("No data received");
      }

      let existinggrowing_from_strength = await this.growing_from_strengthRepository.findOne({
        where: {},
      });

      // let boxDataValue = data.box_data;
      //   if (typeof boxDataValue === 'object') {
      //     boxDataValue = JSON.stringify(boxDataValue);
      //   }
      
      if (existinggrowing_from_strength) {
        await this.growing_from_strengthRepository.update(
          existinggrowing_from_strength.id, 
          {
            title: data.title,
            sub_title: data.sub_title,
            box_data1: data.box_data1,
            box_data2: data.box_data2,
            image: data.image,
            video: data.video,
            button_link: data.button_link,
          }
        );
        var savedgrowing_from_strength = await this.growing_from_strengthRepository.findOne({
          where: { id: existinggrowing_from_strength.id }
        });
      } else {
        const newSlide = this.growing_from_strengthRepository.create({
          title: data.title,
          sub_title: data.sub_title,
          box_data1: data.box_data1,
          box_data2: data.box_data2,
          image: data.image,
          video: data.video,
          button_link: data.button_link,
        });
        var savedgrowing_from_strength = await this.growing_from_strengthRepository.save(newSlide);
      }

      return {
        status: true,
        statusCode: existinggrowing_from_strength ? 200 : 201,
        message: existinggrowing_from_strength
          ? 'growing_from_strength updated successfully.'
          : 'growing_from_strength created successfully.',
        data: savedgrowing_from_strength,
      };
    }


    async getAllGrowingStrengthData() {
      const growing_from_strength = await this.growing_from_strengthRepository.find({});

      const parsedData = growing_from_strength.map(item => {
        
        return {
          id: item.id,
          title: item.title,
          sub_title: item.sub_title,
          // box_data: parsedBoxData, 
          box_data1: item.box_data1,
          box_data2: item.box_data2,
          image: item.image,
          video: item.video,
          button_link: item.button_link,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      return {
        status: true,
        statusCode: 200,
        message: growing_from_strength.length 
          ? 'growing_from_strength fetched successfully.' 
          : 'No growing_from_strength found.',
        data: parsedData,
      };
  }
}