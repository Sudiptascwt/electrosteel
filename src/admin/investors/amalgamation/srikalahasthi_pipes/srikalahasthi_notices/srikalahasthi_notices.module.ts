import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrikalahasthiNotices } from '../../../../../entity/srikalahasthi_notices.entity';
import { SrikalahasthiNoticesController } from './srikalahasthi_notices.controller';
import { SrikalahasthiNoticesService } from './srikalahasthi_notices.service';
@Module({
  imports: [TypeOrmModule.forFeature([SrikalahasthiNotices])],
  controllers: [SrikalahasthiNoticesController],
  providers: [SrikalahasthiNoticesService],
})
export class SrikalahasthiNoticesModule {}