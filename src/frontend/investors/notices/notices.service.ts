import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notices } from 'src/entity/notices.entity';


@Injectable()
export class FrontendNoticesService {
  constructor(
    @InjectRepository(Notices)
    private readonly NoticesRepo: Repository<Notices>,
  ) {}

  async getNoticesData() {
    const Notices = await this.NoticesRepo.find();
    return {
      statusCode: 200,
      message: Notices.length > 0 
        ? 'Notice data fetched successfully' 
        : 'No notice data found',
      data: Notices,
    };
  }
}
