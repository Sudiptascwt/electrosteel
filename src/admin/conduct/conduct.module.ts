import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conduct } from '../../entity/conduct.entity';
import { ConductService } from './conduct.service';
import { ConductController } from './conduct.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Conduct])],
    controllers: [ConductController],
    providers: [ConductService],
})
export class ConductModule {}
