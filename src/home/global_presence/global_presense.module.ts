import { Module } from '@nestjs/common';
import { GlobalPresenceService } from './global_presense.service';
import { GlobalPresenseController } from './global_presense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalPresence } from '../../entity/global_presense.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([GlobalPresence]),
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
  providers: [GlobalPresenceService],
  controllers: [GlobalPresenseController],
})
export class GlobalPresenceModule {}
