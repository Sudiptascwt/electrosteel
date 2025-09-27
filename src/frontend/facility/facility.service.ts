import { Injectable, NotFoundException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facility } from '../../entity/facility.entity';
import { FacilityDto } from '../../dto/facility.dto';

@Injectable()
export class FrontendFacilityService {
  constructor(
    @InjectRepository(Facility)
    private readonly FacilityRepo: Repository<Facility>,
  ) {}
    async findAll() {
        const facilities = await this.FacilityRepo.find();
        return facilities
    }

    // async findById(id: number): Promise<Facility> {
    //     const unit = await this.FacilityRepo.findOne({ where: { id } });
    //     if (!unit) throw new NotFoundException('Facility unit not found');
    //     return unit;
    // }
}