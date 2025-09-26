import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jolsadhana } from '../../entity/jol_sadhana.entity';
import { JolsadhanaDto } from '../../dto/jol_sadhana.dto';

@Injectable()
export class JolsadhanaService {
  constructor(
    @InjectRepository(Jolsadhana)
    private readonly indiaOfficeRepo: Repository<Jolsadhana>,
  ) {}

  // CREATE
  async create(createDto: JolsadhanaDto) {
    const office = this.indiaOfficeRepo.create(createDto);
    const data = await this.indiaOfficeRepo.save(office);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Jolsadhana created successfully',
      data,
    };
  }

  // GET ALL
  async findAll() {
    const data = await this.indiaOfficeRepo.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'Jolsadhana fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findById(id: number) {
    const office = await this.indiaOfficeRepo.findOne({ where: { id } });
    if (!office) {
      throw new NotFoundException(`Jolsadhana with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Jolsadhana fetched successfully',
      data: office,
    };
  }

  // UPDATE
  async update(id: number, updateDto: JolsadhanaDto) {
    const office = await this.indiaOfficeRepo.findOne({ where: { id } });
    if (!office) {
      throw new NotFoundException(`Jolsadhana with ID ${id} not found`);
    }

    Object.assign(office, updateDto);
    const data = await this.indiaOfficeRepo.save(office);

    return {
      statusCode: HttpStatus.OK,
      message: 'Jolsadhana updated successfully',
      data,
    };
  }

  // DELETE
  async delete(id: number) {
    const office = await this.indiaOfficeRepo.findOne({ where: { id } });
    if (!office) {
      throw new NotFoundException(`Jolsadhana with ID ${id} not found`);
    }

    await this.indiaOfficeRepo.remove(office);

    return {
      statusCode: HttpStatus.OK,
      message: 'Jolsadhana deleted successfully',
    };
  }
}
