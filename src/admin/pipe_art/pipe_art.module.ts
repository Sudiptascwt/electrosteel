import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipeArt } from '../../entity/pipe_art.entity';
import { PipeArtService } from './pipe_art.service';
import { PipeArtController } from './pipe_art.controller';
import { PipeArtDetail } from '../../entity/pipe_art_details.entity'

@Module({
    imports: [TypeOrmModule.forFeature([PipeArt,PipeArtDetail])],
    controllers: [PipeArtController],
    providers: [PipeArtService],
})
export class PipeArtModule {}
