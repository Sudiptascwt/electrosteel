import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { growing_from_strengthController } from './growing_from_strength.controller'
import { growing_from_strengthService } from './growing_from_strength.service';
import { growing_from_strength } from 'src/entity/growing_from_strength.entity';

@Module({
  imports: [TypeOrmModule.forFeature([growing_from_strength])],
  controllers: [growing_from_strengthController],
  providers: [growing_from_strengthService],
  exports: [growing_from_strengthService],
})
export class growing_from_strengthModule {}