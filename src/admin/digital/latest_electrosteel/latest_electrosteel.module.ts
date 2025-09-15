import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LatestElectrosteel } from '../../../entity/latest_electrosteel.entity';
import { LatestElectrosteelService } from './latest_electrosteel.service';
import { LatestElectrosteelController } from './latest_electrosteel.controller';

@Module({
    imports: [TypeOrmModule.forFeature([LatestElectrosteel])],
    controllers: [LatestElectrosteelController],
    providers: [LatestElectrosteelService],
})
export class LatestElectrosteelModule {}
