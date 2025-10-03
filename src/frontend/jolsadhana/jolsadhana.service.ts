import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jolsadhana } from '../../entity/jol_sadhana.entity';


@Injectable()
export class FrontendJolsadhanaService {
  constructor(
    @InjectRepository(Jolsadhana)
    private readonly JolsadhanaRepo: Repository<Jolsadhana>,
  ) {}

  async getJolsadhanaData() {
    const Jolsadhana = await this.JolsadhanaRepo.find();
    return {
      statusCode: 200,
      message: Jolsadhana.length > 0 
        ? 'Jolsadhana data fetched successfully' 
        : 'No Jolsadhana data found',
      data: Jolsadhana,
    };
  }
}
