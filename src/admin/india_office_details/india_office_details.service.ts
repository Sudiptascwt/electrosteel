import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IndiaOfficeDetails } from '../../entity/office_details.entity';
import { IndiaOfficeDetailsDto } from '../../dto/india_office_details.dto';

@Injectable()
export class IndiaOfficeDetailsService {
  constructor(
    @InjectRepository(IndiaOfficeDetails)
    private readonly indiaOfficeRepo: Repository<IndiaOfficeDetails>,
  ) {}

  // CREATE
  async create(createDto: IndiaOfficeDetailsDto) {
    const office = this.indiaOfficeRepo.create(createDto);
    const data = await this.indiaOfficeRepo.save(office);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Office created successfully',
      data,
    };
  }

  // GET ALL
  async findAll() {
    const data = await this.indiaOfficeRepo.find();
    return {
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
      statusCode: HttpStatus.OK,
      message: 'Office details fetched successfully',
      data: office,
    };
  }

  // UPDATE
  async update(id: number, updateDto: IndiaOfficeDetailsDto) {
    const office = await this.indiaOfficeRepo.findOne({ where: { id } });
    if (!office) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }

    Object.assign(office, updateDto);
    const data = await this.indiaOfficeRepo.save(office);

    return {
      statusCode: HttpStatus.OK,
      message: 'Office updated successfully',
      data,
    };
  }

  // DELETE
  async delete(id: number) {
    const office = await this.indiaOfficeRepo.findOne({ where: { id } });
    if (!office) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }

    await this.indiaOfficeRepo.remove(office);

    return {
      statusCode: HttpStatus.OK,
      message: 'Office deleted successfully',
    };
  }
}
