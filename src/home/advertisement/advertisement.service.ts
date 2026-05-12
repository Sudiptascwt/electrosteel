import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, Repository } from 'typeorm';
import { Advertisement } from '../../entity/advertisement.entity';
import { AdvertisementDto } from '../../dto/advertisement.dto';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectRepository(Advertisement)
    private readonly advertisementRepository: Repository<Advertisement>,
  ) {}

  async save(data: any) {
    if (!data) {
      throw new Error("No data received");
    }
    let boxDataString: string = null;
    if (Array.isArray(data.box_data)) {
      boxDataString = JSON.stringify(data.box_data);
    } else if (typeof data.box_data === 'string') {
      boxDataString = data.box_data;
    }

    let existingRecords = await this.advertisementRepository.find();

    if (existingRecords && existingRecords.length > 0) {
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title;
      recordToUpdate.sub_title = data.sub_title;
      recordToUpdate.box_title = data.box_title;
      recordToUpdate.box_data = boxDataString;
      recordToUpdate.image_title = data.image_title;
      recordToUpdate.image1 = data.image1;
      recordToUpdate.image2 = data.image2;
      recordToUpdate.image3 = data.image3;
      recordToUpdate.play_store_link = data.play_store_link;
      recordToUpdate.apple_store_link = data.apple_store_link;
      
      const savedRecord = await this.advertisementRepository.save(recordToUpdate)
      
      return {
        status: true,
        statusCode: 200,
        message: 'Data updated successfully.',
        data: {
          ...savedRecord,
          box_data: savedRecord.box_data ? JSON.parse(savedRecord.box_data) : []
        },
      };
    } else {
      const newRecord = this.advertisementRepository.create({
        title: data.title,
        sub_title: data.sub_title,
        box_title: data.box_title,
        box_data: boxDataString, 
        image_title: data.image_title,
        image1: data.image1,
        image2: data.image2,
        image3: data.image3,
        play_store_link :data.play_store_link,
        apple_store_link : data.apple_store_link,
      });
      
      const savedRecord = await this.advertisementRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: 'Data created successfully.',
        data: {
          ...savedRecord,
          box_data: savedRecord.box_data ? JSON.parse(savedRecord.box_data) : []
        },
      };
    }
  }
  async getAllAdvertisementData() {
    const existingAd = await this.advertisementRepository.find({});
    if (!existingAd) {
      return {
        status: false,
        statusCode: 404,
        message: 'Advertisement not found',
        data: [],
      };
    }
    const parsedData = existingAd.map(item => {
        let parsedBoxData = item.box_data;
        
        if (item.box_data && typeof item.box_data === 'string') {
          try {
            parsedBoxData = JSON.parse(item.box_data);
          } catch (e) {
            console.error('Failed to parse box_data:', e);
          }
        }
        
        return {
          id: item.id,
          title: item.title,
          sub_title: item.sub_title,
          box_title: item.box_title,
          box_data: parsedBoxData, 
          image_title: item.image_title,
          image1: item.image1,
          image2: item.image2,
          image3: item.image3,
          play_store_link :item.play_store_link,
          apple_store_link : item.apple_store_link,
        };
    });
      return {
        status: true,
        statusCode: 200,
        message: existingAd.length
          ? 'Advertisement data fetched successfully'
          : 'No advertisement data found.',
        data: parsedData,
      };
  }
}
