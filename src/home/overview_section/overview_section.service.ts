import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OverviewSection } from '../../entity/overview_section.entity';
import * as fs from 'fs';
import * as path from 'path';
import { OverviewSectionDto } from 'src/dto/overview_section.dto';

@Injectable()
export class overViewService {
  constructor(
    @InjectRepository(OverviewSection)
    private readonly overViewRepository: Repository<OverviewSection>,
  ) {}

    async saveOverview(data: OverviewSectionDto) {
      if (!data) {
          throw new Error("No data received");
      }

      const existingOverview = await this.overViewRepository.findOne({
          where: {},
      });

      if (existingOverview) {
        await this.overViewRepository.delete(existingOverview.id);
      }

      const newSlide = this.overViewRepository.create({
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          url: data.url
      });

      const savedOverview = await this.overViewRepository.save(newSlide);

      return {
          status: true,
          statusCode: existingOverview ? 200 : 201,
          message: existingOverview
          ? 'Overview section updated successfully.'
          : 'Overview section created successfully.',
          data: savedOverview,
      };
    }

    async getAlloverView() {
      const Overview = await this.overViewRepository.find({
      });
      return {
        status: true,
        statusCode: 200,
        message: Overview.length ? 'Overview section fetched successfully.' : 'No Overview section found.',
        data: Overview,
      };
    }
}