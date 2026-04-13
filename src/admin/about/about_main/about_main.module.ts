import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutMain } from '../../../entity/about_main.entity';
import { AboutMainService } from './about_main.service';
import { AboutMainController } from './about_main.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AboutMain])],
  providers: [AboutMainService],
  controllers: [AboutMainController],
})
export class AboutMainModule {}
