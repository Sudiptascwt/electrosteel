import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendIepfSuspenseController } from './iepf_suspense_account.controller';
import { FrontendIepfSuspenseService } from './iepf_suspense_account.service';
import { IepfSuspense } from 'src/entity/iepf_suspense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IepfSuspense])],
  controllers: [FrontendIepfSuspenseController],
  providers: [FrontendIepfSuspenseService],
})
export class FrontendIepfSuspenseModule {}
