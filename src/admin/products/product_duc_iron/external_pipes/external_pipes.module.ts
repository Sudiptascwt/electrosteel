import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalPipes } from '../../../../entity/pipes_external.entity';
import { ExternalPipesService } from './External_pipes.service';
import { ExternalPipesController } from './External_pipes.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ExternalPipes])],
    controllers: [ExternalPipesController],
    providers: [ExternalPipesService],
})
export class ExternalPipesModule {}