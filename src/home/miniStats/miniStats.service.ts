import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mini_stats } from '../../entity/mini_stats.entity';
import * as fs from 'fs';
import * as path from 'path';
import { mini_statsDto } from 'src/dto/mini_stats.dto';

@Injectable()
export class miniStatsService {
  constructor(
    @InjectRepository(mini_stats)
    private readonly miniStatsRepository: Repository<mini_stats>,
  ) {}

    async saveMiniStat(data: mini_statsDto) {
    if (!data) {
        throw new Error("No data received");
    }

    const existingSlide = await this.miniStatsRepository.findOne({
        where: {},
    });

    if (existingSlide) {
        if (existingSlide.cardImage) {
            const oldFilePath = path.join('./uploads/', existingSlide.cardImage);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }

        await this.miniStatsRepository.delete(existingSlide.id);
    }

    const newSlide = this.miniStatsRepository.create({
        cardImage: data.cardImage,
        cardImageAlt: data.cardImageAlt,
        title: data.title,
        statsCount: data.statsCount
    });

    const savedSlide = await this.miniStatsRepository.save(newSlide);

    return {
        status: true,
        statusCode: existingSlide ? 200 : 201,
        message: existingSlide
        ? 'Mini stat updated successfully.'
        : 'Mini stat created successfully.',
        data: savedSlide,
    };
    }

  async getAllMiniStats() {
    const slides = await this.miniStatsRepository.find({
    });

    return {
      status: true,
      statusCode: 200,
      message: slides.length ? 'Mini stat fetched successfully.' : 'No Mini stat found.',
      data: slides,
    };
  }
}