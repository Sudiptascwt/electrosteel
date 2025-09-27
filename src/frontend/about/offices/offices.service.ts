import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IndiaOfficeDetails } from 'src/entity/india_office_details.entity';


@Injectable()
export class OfficesService {
  constructor(
    @InjectRepository(IndiaOfficeDetails)
    private readonly StockYardRepo: Repository<IndiaOfficeDetails>,
  ) {}

  async getIndianOfficesData() {
    const IndianOffices = await this.StockYardRepo.find();
    return {
      statusCode: 200,
      message: IndianOffices.length > 0 
        ? 'Indian Offices fetched successfully' 
        : 'No Indian Offices found',
      data: IndianOffices,
    };
  }
}
