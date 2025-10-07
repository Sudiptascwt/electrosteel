import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notices160 } from 'src/entity/160_notice.entity';


@Injectable()
export class frontend_160_notice_service {
  constructor(
    @InjectRepository(Notices160)
    private readonly NoticesRepo: Repository<Notices160>,
  ) {}

  async getNotices160() {
    const Notices = await this.NoticesRepo.find();
    return {
      statusCode: 200,
      message: Notices.length > 0 
        ? '160Notice data fetched successfully' 
        : 'No 160notice data found',
      data: Notices,
    };
  }
}
