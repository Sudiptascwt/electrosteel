import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { IndiaOfficeDetails } from 'src/entity/office_details.entity';


@Injectable()
export class OfficesService {
  constructor(
    @InjectRepository(IndiaOfficeDetails)
    private readonly OfficeRepo: Repository<IndiaOfficeDetails>,
  ) {}
    //get the offices by type
    async getOfficesData(country?: string) {
      let whereClause: FindOptionsWhere<IndiaOfficeDetails> = {};

      if (country) {
        whereClause = { country } as FindOptionsWhere<IndiaOfficeDetails>;
      }

      const offices = await this.OfficeRepo.find({ where: whereClause });

      return {
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
        statusCode: 200,
        message:
          indiaOffices.length > 0
            ? 'India Offices fetched successfully'
            : 'No India Offices found',
        data: indiaOffices,
      };
    }
}