import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IepfSuspense } from '../../../entity/iepf_suspense.entity';
import { IepfSuspenseController } from './iepf_suspense.controller';
import { IepfSuspenseService } from './iepf_suspense.service';
@Module({
  imports: [TypeOrmModule.forFeature([IepfSuspense])],
  controllers: [IepfSuspenseController],
  providers: [IepfSuspenseService],
})
export class IepfSuspenseModule {}
