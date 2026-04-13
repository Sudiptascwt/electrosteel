import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, Repository } from 'typeorm';
import { AboutMain } from '../../../entity/about_main.entity';
import { AboutMainDto } from '../../../dto/about_main.dto';

@Injectable()
export class AboutMainService {
  constructor(
    @InjectRepository(AboutMain)
    private readonly AboutMainRepository: Repository<AboutMain>,
  ) {}

  async save(data: any) {
    if (!data) {
      throw new Error("No data received");
    }
    console.log("datasss",data)

    let existingRecords = await this.AboutMainRepository.find();

    if (existingRecords && existingRecords.length > 0) {
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title;
      recordToUpdate.image = data.image;
      
      const savedRecord = await this.AboutMainRepository.save(recordToUpdate)
      
      return {
        status: true,
        statusCode: 200,
        message: 'Data updated successfully.',
        data: savedRecord
      };
    } else {
      const newRecord = this.AboutMainRepository.create({
        title: data.title,
        image: data.image
      });
      
      const savedRecord = await this.AboutMainRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: 'Data created successfully.',
        data: savedRecord
      };
    }
  }

  async getAllAboutMainData() {
    const existingAd = await this.AboutMainRepository.find({});
    if (!existingAd) {
      return {
        status: false,
        statusCode: 404,
        message: 'AboutMain not found',
        data: [],
      };
    }
      return {
        status: true,
        statusCode: 200,
        message: existingAd.length
          ? 'About Main data fetched successfully'
          : 'No About Main data found.',
        data: existingAd
      };
  }

  ///////////// growing strength ////////////
  async GrowingStrengthsave(data: any) {
    if (!data) {
      throw new Error("No data received");
    }
    console.log("datasss",data)

    let existingRecords = await this.AboutMainRepository.find();

    if (existingRecords && existingRecords.length > 0) {
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title;
      recordToUpdate.image = data.image;
      
      const savedRecord = await this.AboutMainRepository.save(recordToUpdate)
      
      return {
        status: true,
        statusCode: 200,
        message: 'Data updated successfully.',
        data: savedRecord
      };
    } else {
      const newRecord = this.AboutMainRepository.create({
        title: data.title,
        image: data.image
      });
      
      const savedRecord = await this.AboutMainRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: 'Data created successfully.',
        data: savedRecord
      };
    }
  }

  async getAllGrowingStrengthData() {
    const existingAd = await this.AboutMainRepository.find({});
    if (!existingAd) {
      return {
        status: false,
        statusCode: 404,
        message: 'AboutMain not found',
        data: [],
      };
    }
      return {
        status: true,
        statusCode: 200,
        message: existingAd.length
          ? 'About Main data fetched successfully'
          : 'No About Main data found.',
        data: existingAd
      };
  }
}
