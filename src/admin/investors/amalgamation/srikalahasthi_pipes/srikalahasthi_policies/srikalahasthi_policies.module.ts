import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrikalahasthiPolicies } from '../../../../../entity/srikalahasthi_policies.entity';
import { SrikalahasthiPoliciesController } from './srikalahasthi_policies.controller';
import { SrikalahasthiPoliciesService } from './srikalahasthi_policies.service';
@Module({
  imports: [TypeOrmModule.forFeature([SrikalahasthiPolicies])],
  controllers: [SrikalahasthiPoliciesController],
  providers: [SrikalahasthiPoliciesService],
})
export class SrikalahasthiPoliciesModule {}