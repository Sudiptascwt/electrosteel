import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directors } from '../../../entity/director.entity';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Directors])],
    controllers: [DirectorController],
    providers: [DirectorService],
})
export class DirectorModule {}
