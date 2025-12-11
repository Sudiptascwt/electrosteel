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
    return await this.manufacturingRepo.find({ where: { status: 1 } });
  }

  async findById(id: number): Promise<ManufacturingUnit> {
    const unit = await this.manufacturingRepo.findOne({ where: { id,status: 1 } });
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
    const result = await this.manufacturingRepo.update(
      { id },
      { status: 0 }  
    );
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