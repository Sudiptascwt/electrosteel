import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManufacturingUnit } from '../../entity/manufacturing.entity';
import { ManufacturingUnitDto } from '../../dto/manufacturing.dto';

@Injectable()
export class ManufacturingService {
  constructor(
    @InjectRepository(ManufacturingUnit)
    private readonly manufacturingRepo: Repository<ManufacturingUnit>,
  ) {}

  async create(createDto: ManufacturingUnitDto): Promise<ManufacturingUnit> {
    const unit = this.manufacturingRepo.create(createDto);
    return await this.manufacturingRepo.save(unit);
  }

  async findAll(): Promise<ManufacturingUnit[]> {
    return await this.manufacturingRepo.find();
  }

  async findById(id: number): Promise<ManufacturingUnit> {
    const unit = await this.manufacturingRepo.findOne({ where: { id } });
    if (!unit){
      throw new NotFoundException({
          message: `Manufacturing unit not found`,
          error: 'Not Found',
          statusCode: 404,
          status: false
      });
    }

    return unit;
  }

  async update(id: number, updateDto: ManufacturingUnitDto): Promise<ManufacturingUnit> {
    const unit = await this.findById(id);
    Object.assign(unit, updateDto);
    return await this.manufacturingRepo.save(unit);
  }

  async delete(id: number): Promise<void> {
    const result = await this.manufacturingRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException({
          message: `Manufacturing unit not found`,
          error: 'Not Found',
          statusCode: 404,
          status: false
      });
    }
  }
}