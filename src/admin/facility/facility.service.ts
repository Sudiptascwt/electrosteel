import { Injectable, NotFoundException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facility } from '../../entity/facility.entity';
import { FacilityDto } from '../../dto/facility.dto';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facility)
    private readonly FacilityRepo: Repository<Facility>,
  ) {}

  async create(createDto: FacilityDto): Promise<Facility> {
    if (createDto.title==null || createDto.description==null) {
        throw new BadRequestException ('Title or description are required');
    }
    const unit = this.FacilityRepo.create(createDto);
    return await this.FacilityRepo.save(unit);
  }

  async findAll(): Promise<Facility[]> {
    return await this.FacilityRepo.find();
  }

  async findById(id: number): Promise<Facility> {
    const unit = await this.FacilityRepo.findOne({ where: { id } });
    if (!unit) throw new NotFoundException('Facility unit not found');
    return unit;
  }

  async update(id: number, updateDto: FacilityDto): Promise<Facility> {
    const unit = await this.findById(id);
    Object.assign(unit, updateDto);
    return await this.FacilityRepo.save(unit);
  }

  async delete(id: number): Promise<void> {
    const result = await this.FacilityRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Facility unit not found');
    }
  }
}