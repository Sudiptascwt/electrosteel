import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subsidiaries } from 'src/entity/subsidiaries.entity';


@Injectable()
export class FrontendSubsidiariesService {
  constructor(
    @InjectRepository(Subsidiaries)
    private readonly SubsidiariesRepo: Repository<Subsidiaries>,
  ) {}

  async getSubsidiariesData() {
    const subsidiaries = await this.SubsidiariesRepo.find();
    return {
      statusCode: 200,
      message: subsidiaries.length > 0 
        ? 'Subsidiaries fetched successfully' 
        : 'No subsidiaries found',
      data: subsidiaries,
    };
  }
}
