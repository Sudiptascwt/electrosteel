import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FittingsExternalPipes } from 'src/entity/fittings_external.entity';
import { FittingsExternalsService } from './fittings_external_pipes.service'
import { FittingsExternalsController } from './fittings_external_pipes.controller';

@Module({
    imports: [TypeOrmModule.forFeature([FittingsExternalPipes])],
    controllers: [FittingsExternalsController],
    providers: [FittingsExternalsService],
})
export class FittingsExternalsModule {}