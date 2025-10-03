import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendSubsidiariesController } from './Subsidiaries.controller';
import { FrontendSubsidiariesService } from './Subsidiaries.service';
import { Subsidiaries } from 'src/entity/subsidiaries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subsidiaries])],
  controllers: [FrontendSubsidiariesController],
  providers: [FrontendSubsidiariesService],
})
export class FrontendSubsidiariesModule {}
