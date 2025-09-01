import { Module } from '@nestjs/common';
import { AllCertificatesService } from '../all_certificates/certificates.service';
import { AllCertificatesController } from './certificates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllCertificate } from '../../entity/all_certificates.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([AllCertificate]),
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
  providers: [AllCertificatesService],
  controllers: [AllCertificatesController],
})
export class AllCertificatesModule {}
