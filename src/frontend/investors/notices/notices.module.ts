import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendNoticesController } from './notices.controller';
import { FrontendNoticesService } from './notices.service';
import { Notices } from 'src/entity/notices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notices])],
  controllers: [FrontendNoticesController],
  providers: [FrontendNoticesService],
})
export class FrontendNoticesModule {}
