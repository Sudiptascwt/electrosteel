import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subsidiaries } from '../../entity/subsidiaries.entity';
import { SubsidiariesController } from './subsidiaries.controller';
import { SubsidiariesService } from './subsidiaries.service';
import { SubsidiariesPage } from 'src/entity/subsidiaries_page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subsidiaries, SubsidiariesPage])],
  controllers: [SubsidiariesController],
  providers: [SubsidiariesService],
})
export class SubsidiariesModule {}
