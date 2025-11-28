import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllOfficeDetails } from '../../entity/office_details.entity';
import { AllOfficeDetailsDto } from '../../dto/india_office_details.dto';

@Injectable()
export class AllOfficeDetailsService {
  constructor(
    @InjectRepository(AllOfficeDetails)
    private readonly indiaOfficeRepo: Repository<AllOfficeDetails>,
  ) {}

  // CREATE
  async create(createDto: AllOfficeDetailsDto) {
    const office = this.indiaOfficeRepo.create(createDto);
    const data = await this.indiaOfficeRepo.save(office);

    return {
      status: true,
      statusCode: HttpStatus.CREATED,
      message: 'Office created successfully',
      data,
    };
  }

  // GET ALL
  async findAll() {
    const data = await this.indiaOfficeRepo.find();
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'All Offices fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findById(id: number) {
    const office = await this.indiaOfficeRepo.findOne({ where: { id } });
    if (!office) {
      throw new NotFoundException(`Office details with ID ${id} not found`);
    }
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Office details fetched successfully',
      data: office,
    };
  }

  // UPDATE
  async update(id: number, updateDto: AllOfficeDetailsDto) {
    const office = await this.indiaOfficeRepo.findOne({ where: { id } });
    if (!office) {
      throw new NotFoundException({
        message: `Office with ID ${id} not found`,
        error: 'Not Found',
        statusCode: 404,
        status: false,
      });
    }

    Object.assign(office, updateDto);
    const data = await this.indiaOfficeRepo.save(office);

    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Office updated successfully',
      data,
    };
  }

  // DELETE
  async delete(id: number) {
    const office = await this.indiaOfficeRepo.findOne({ where: { id } });
    if (!office) {
      throw new NotFoundException({
        message: `Office with ID ${id} not found`,
        error: 'Not Found',
        statusCode: 404,
        status: false,
      });
    }

    await this.indiaOfficeRepo.remove(office);

    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Office deleted successfully',
    };
  }
}
