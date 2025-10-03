import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendLatestElectrosteelController } from './latest_electrosteel.controller';
import { FrontendLatestElectrosteelService } from './latest_electrosteel.service';
import { LatestElectrosteel } from 'src/entity/latest_electrosteel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LatestElectrosteel])],
  controllers: [FrontendLatestElectrosteelController],
  providers: [FrontendLatestElectrosteelService],
})
export class FrontendLatestElectrosteelModule {}
