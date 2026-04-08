import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mini_stats } from '../../entity/mini_stats.entity';
import * as fs from 'fs';
import * as path from 'path';
import { OverviewSectionDto } from 'src/dto/overview_section.dto';

@Injectable()
export class overViewService {
  constructor(
    @InjectRepository(mini_stats)
    private readonly overViewRepository: Repository<mini_stats>,
  ) {}

    async saveMiniStat(data: OverviewSectionDto) {
    if (!data) {
        throw new Error("No data received");
    }

    const existingSlide = await this.overViewRepository.findOne({
        where: {},
    });

    if (existingSlide) {
        if (existingSlide.cardImage) {
            const oldFilePath = path.join('./uploads/', existingSlide.cardImage);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }

        await this.overViewRepository.delete(existingSlide.id);
    }

    const newSlide = this.overViewRepository.create({
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        url: data.url
    });

    const savedSlide = await this.overViewRepository.save(newSlide);

    return {
        status: true,
        statusCode: existingSlide ? 200 : 201,
        message: existingSlide
        ? 'Overview section updated successfully.'
        : 'Overview section created successfully.',
        data: savedSlide,
    };
    }

  async getAlloverView() {
    const slides = await this.overViewRepository.find({
    });

    return {
      status: true,
      statusCode: 200,
      message: slides.length ? 'Overview section fetched successfully.' : 'No Overview section found.',
      data: slides,
    };
  }
}