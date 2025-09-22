import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notices } from '../../../entity/notices.entity';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';
@Module({
  imports: [TypeOrmModule.forFeature([Notices])],
  controllers: [NoticesController],
  providers: [NoticesService],
})
export class NoticesModule {}
