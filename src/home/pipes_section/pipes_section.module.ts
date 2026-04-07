import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pipes_section } from '../../entity/pipes_section.entity';
import { pipes_sectionService } from './pipes_section.service';
import { pipes_sectionController } from './pipes_section.controller';

@Module({
    imports: [TypeOrmModule.forFeature([pipes_section])],
    controllers: [pipes_sectionController],
    providers: [pipes_sectionService],
})
export class pipes_sectionModule {}
