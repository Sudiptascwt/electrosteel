import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrikalahasthiDirectorsResignation } from '../../../../../entity/srikalahasthi_directors_resignation.entity';
import { SrikalahasthiDirectorsResignationController } from './srikalahasthi_directors_resignation.controller';
import { SrikalahasthiDirectorsResignationService } from './srikalahasthi_directors_resignation.service';
@Module({
  imports: [TypeOrmModule.forFeature([SrikalahasthiDirectorsResignation])],
  controllers: [SrikalahasthiDirectorsResignationController],
  providers: [SrikalahasthiDirectorsResignationService],
})
export class SrikalahasthiDirectorsResignationModule {}
