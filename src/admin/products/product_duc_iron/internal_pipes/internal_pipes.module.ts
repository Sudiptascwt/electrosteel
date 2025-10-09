import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternalPipes } from '../../../../entity/pipes_internal.entity';
import { InternalPipesService } from './internal_pipes.service';
import { InternalPipesController } from './internal_pipes.controller';

@Module({
    imports: [TypeOrmModule.forFeature([InternalPipes])],
    controllers: [InternalPipesController],
    providers: [InternalPipesService],
})
export class InternalPipesModule {}