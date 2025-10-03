import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendJolsadhanaController } from './jolsadhana.controller';
import { FrontendJolsadhanaService } from './jolsadhana.service';
import { Jolsadhana } from '../../entity/jol_sadhana.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jolsadhana])],
  controllers: [FrontendJolsadhanaController],
  providers: [FrontendJolsadhanaService],
})
export class FrontendJolsadhanaModule {}
