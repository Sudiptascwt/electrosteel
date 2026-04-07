import { Module } from '@nestjs/common';
import { home_slidesService } from './home_slides.service';
import { home_slidesController } from './home_slides.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { home_slides } from '../../entity/home_slides.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([home_slides]), 
  ],
  providers: [home_slidesService],
  controllers: [home_slidesController]
})
export class home_slidesModule {}