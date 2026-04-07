import { Module } from '@nestjs/common';
import { CareService } from './care.service';
import { CareController } from './care.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Care } from '../../entity/care.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Care]),
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
  providers: [CareService],
  controllers: [CareController],
})
export class CareModule {}
