import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendRegulationController } from './regulation.controller';
import { FrontendRegulationService } from './regulation.service';
import { Regulation } from 'src/entity/regulation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Regulation])],
  controllers: [FrontendRegulationController],
  providers: [FrontendRegulationService],
})
export class FrontendRegulationModule {}
