import { Module } from '@nestjs/common';
import { AdvancementService } from './advancement.service';
import { AdvancementController } from './advancement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advancement } from '../../entity/advancement.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Advancement]),
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
  providers: [AdvancementService],
  controllers: [AdvancementController],
})
export class AdvancementModule {}
