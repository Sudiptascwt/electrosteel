import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AllOfficeDetails } from 'src/entity/office_details.entity';


@Injectable()
export class OfficesService {
  constructor(
    @InjectRepository(AllOfficeDetails)
    private readonly OfficeRepo: Repository<AllOfficeDetails>,
  ) {}
    //get the offices by type
    async getOfficesData(country?: string) {
      let whereClause: FindOptionsWhere<AllOfficeDetails> = {};

      if (country) {
        whereClause = { country } as FindOptionsWhere<AllOfficeDetails>;
      }

      const offices = await this.OfficeRepo.find({ where: whereClause });

      return {
        status: true,
        statusCode: 200,
        message:
          offices.length > 0
            ? 'Offices fetched successfully'
            : 'No Offices found',
        data: offices,
      };
    }

    //get India offices data
    async getIndiaOfficesData() {
      const indiaOffices = await this.OfficeRepo.find({
        where: { country: 'India' },
      });
      return {
        status: true,
        statusCode: 200,
        message:
          indiaOffices.length > 0
            ? 'India Offices fetched successfully'
            : 'No India Offices found',
        data: indiaOffices,
      };
    }

  async findOfficeByRegionAndCountry(region: string, country: string) {
    if (!region || !country) {
      return {
        status: false,
        statusCode: 400,
        message: 'Both region and country are required',
        data: [],
      };
    }

    const offices = await this.OfficeRepo.find({
      where: { region, country },
    });

    return {
      status: true,
      statusCode: 200,
      message:
        offices.length > 0
          ? 'Offices fetched by region successfully'
          : 'No offices found',
      data: offices,
    };
  }
}