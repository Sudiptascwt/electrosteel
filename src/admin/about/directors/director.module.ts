import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directors } from '../../../entity/director.entity';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { AllPagesTitle } from '../../../entity/all_page_title.entity';  

@Module({
    imports: [TypeOrmModule.forFeature([Directors, AllPagesTitle])],
    controllers: [DirectorController],
    providers: [DirectorService],
})
export class DirectorModule {}
