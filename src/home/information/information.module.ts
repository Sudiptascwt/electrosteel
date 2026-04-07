import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Information } from '../../entity/information.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Information]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Folder where images will be saved
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  providers: [InformationService],
  controllers: [InformationController],
})
export class InformationModule {}