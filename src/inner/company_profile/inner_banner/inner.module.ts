import { Module } from '@nestjs/common';
import { InnerService } from './inner.service';
import { InnerController } from './inner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from '../../../entity/certificate.entity';
import { InnerBanner } from '../../../entity/inner_banner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InnerBanner]), 
  ],
  providers: [InnerService],
  controllers: [InnerController]
})
export class InnerModule {}
