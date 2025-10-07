import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IepfSuspense } from 'src/entity/iepf_suspense.entity';


@Injectable()
export class FrontendIepfSuspenseService {
  constructor(
    @InjectRepository(IepfSuspense)
    private readonly IepfSuspenseRepo: Repository<IepfSuspense>,
  ) {}

  async getIepfSuspenseData() {
    const IepfSuspense = await this.IepfSuspenseRepo.find();
    return {
      statusCode: 200,
      message: IepfSuspense.length > 0 
        ? 'Iepf suspense accounts fetched successfully' 
        : 'No iepf suspense account found',
      data: IepfSuspense,
    };
  }
}
