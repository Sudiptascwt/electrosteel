import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vision } from '../../../entity/vision.entity';
import { AboutService } from './vision.service';
import { AboutController } from './vision.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Vision])],
    controllers: [AboutController],
    providers: [AboutService],
})
export class AboutModule {}
