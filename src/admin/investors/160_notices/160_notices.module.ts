import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notices160 } from '../../../entity/160_notice.entity';
import { Notices160Controller } from './160_notices.controller';
import { Notices160Service } from './160_notices.service';
@Module({
  imports: [TypeOrmModule.forFeature([Notices160])],
  controllers: [Notices160Controller],
  providers: [Notices160Service],
})
export class Notices160Module {}
