import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FittingsInternalService } from './fittings_internal_pipes.service'
import { FittingsInternalController } from './fittings_internal_pipes.controller';
import { FittingsInternalPipes } from 'src/entity/fittings_internal.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FittingsInternalPipes])],
    controllers: [FittingsInternalController],
    providers: [FittingsInternalService],
})
export class FittingsInternalModule {}