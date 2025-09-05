import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../entity/image_file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]), 
  ],
  providers: [ImageService],
  controllers: [ImageController]
})
export class ImageModule {}