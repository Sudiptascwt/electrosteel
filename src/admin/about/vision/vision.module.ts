import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vision } from '../../../entity/vision.entity';
import { AboutService } from './vision.service';
import { AboutController } from './vision.controller';
import { VisionPrinciples } from '../../../entity/vision_principles.entity';
import { headings } from 'src/entity/headings.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Vision, VisionPrinciples, headings])],
    controllers: [AboutController],
    providers: [AboutService],
})
export class AboutModule {}
