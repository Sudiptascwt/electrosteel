import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlangePipeController } from './flange-pipe.controller';
import { FlangePipeService } from './flange-pipe.service';
import { FlangePipe } from '../../../entity/flange-pipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FlangePipe])],
  controllers: [FlangePipeController],
  providers: [FlangePipeService],
  exports: [FlangePipeService],
})
export class FlangePipeModule {}