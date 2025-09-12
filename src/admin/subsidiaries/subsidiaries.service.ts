import { Injectable, NotFoundException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subsidiaries } from '../../entity/subsidiaries.entity';
import { SubsidiariesDto } from '../../dto/subsidiaries.dto';
import { SubsidiariesPage } from 'src/entity/subsidiaries_page.entity';
import { SubsidiariesPageDto } from 'src/dto/subsidiaries_page.dto';

@Injectable()
export class SubsidiariesService {
  constructor(
    @InjectRepository(Subsidiaries)
    private readonly SubsidiariesRepo: Repository<Subsidiaries>,
    @InjectRepository(SubsidiariesPage)
    private readonly SubsidiariesPageRepo: Repository<SubsidiariesPage>,
  ) {}

  async create(createDto: SubsidiariesDto): Promise<Subsidiaries> {
      if (
          createDto.country_link == null || 
          createDto.description == null
      ) {
          throw new BadRequestException('country_link and description are required');
      }
      const unit = this.SubsidiariesRepo.create(createDto);
      return await this.SubsidiariesRepo.save(unit);
  }


  async findAll(): Promise<Subsidiaries[]> {
    return await this.SubsidiariesRepo.find();
  }

  async findById(id: number): Promise<Subsidiaries> {
    const unit = await this.SubsidiariesRepo.findOne({ where: { id } });
    if (!unit) throw new NotFoundException('Subsidiaries not found');
    return unit;
  }

  async update(id: number, updateDto: SubsidiariesDto): Promise<Subsidiaries> {
    const unit = await this.findById(id);
    Object.assign(unit, updateDto);
    return await this.SubsidiariesRepo.save(unit);
  }

  async delete(id: number): Promise<void> {
    const result = await this.SubsidiariesRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Subsidiaries not found');
    }
  }

  ////////////susbsidiaries page/////////////////////
  async createSubsdiariesPage(createDto: SubsidiariesPageDto): Promise<SubsidiariesPage> {
      // if (
      //     createDto.country_link == null || 
      //     createDto.description == null
      // ) {
      //     throw new BadRequestException('country_link and description are required');
      // }
      const unit = this.SubsidiariesPageRepo.create(createDto);
      return await this.SubsidiariesPageRepo.save(unit);
  }


  async findAllSubsdiariesPage(): Promise<SubsidiariesPage[]> {
    return await this.SubsidiariesPageRepo.find();
  }

  async findSubsdiariesPageById(id: number): Promise<SubsidiariesPage> {
    const unit = await this.SubsidiariesPageRepo.findOne({ where: { id } });
    if (!unit) throw new NotFoundException('Subsidiaries page not found');
    return unit;
  }

  async updateSubsdiariesPage(id: number, updateDto: SubsidiariesPageDto): Promise<SubsidiariesPage> {
    const unit = await this.findById(id);
    Object.assign(unit, updateDto);
    return await this.SubsidiariesPageRepo.save(unit);
  }

  async deleteSubsdiariesPage(id: number): Promise<void> {
    const result = await this.SubsidiariesPageRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Subsidiaries page not found');
    }
  }
}