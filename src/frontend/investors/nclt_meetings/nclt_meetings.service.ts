import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NcltMeeting } from 'src/entity/nclt_meetings.entity';


@Injectable()
export class FrontendNcltMeetingsService {
  constructor(
    @InjectRepository(NcltMeeting)
    private readonly NcltMeetingsRepo: Repository<NcltMeeting>,
  ) {}

  async getNcltMeetingsData() {
    const NcltMeetings = await this.NcltMeetingsRepo.find();
    return {
      statusCode: 200,
      message: NcltMeetings.length > 0 
        ? 'Nclt meetings fetched successfully' 
        : 'No Nclt meetings found',
      data: NcltMeetings,
    };
  }
}
