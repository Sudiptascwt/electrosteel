import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrikalahasthiFamiliarizationProgramme } from '../../../../../entity/srikalahasthi_familiarization_programme.entity';
import { SrikalahasthiFamiliarizationProgrammeController } from './srikalahasthi_familiarization_programme.controller';
import { SrikalahasthiFamiliarizationProgrammeService } from './srikalahasthi_familiarization_programme.service';
@Module({
  imports: [TypeOrmModule.forFeature([SrikalahasthiFamiliarizationProgramme])],
  controllers: [SrikalahasthiFamiliarizationProgrammeController],
  providers: [SrikalahasthiFamiliarizationProgrammeService],
})
export class SrikalahasthiFamiliarizationProgrammeModule {}