import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { product_applications } from '../../../entity/product_application.entity';
import { Advancement } from 'src/entity/advancement.entity';
import { AdvancementDto } from 'src/dto/advancement.dto';

@Injectable()
export class TechnologicalAdvancementsService {
  constructor(
    @InjectRepository(Advancement)
    private readonly productAppRepo: Repository<Advancement>,
  ) {}


  // GET ALL
  async findAll() {
    const data = await this.productAppRepo.find({ order: { id: 'DESC' } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Technological advancement fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findById(id: number) {
    const app = await this.productAppRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Technological advancement with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Technological advancement fetched successfully',
      data: app,
    };
  }
}