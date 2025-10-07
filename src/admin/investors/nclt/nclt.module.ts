import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NcltMeeting } from '../../../entity/nclt_meetings.entity';
import { NcltController } from './nclt.controller';
import { NcltService } from './nclt.service';
import { NcltFinalOrder } from '../../../entity/nclt_final_order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NcltMeeting, NcltFinalOrder])],
  controllers: [NcltController],
  providers: [NcltService],
})
export class NcltModule {}
