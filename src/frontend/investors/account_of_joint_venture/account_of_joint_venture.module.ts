import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendAccountofJointVentureController } from './account_of_joint_venture.controller';
import { FrontendAccountofJointVentureService } from './account_of_joint_venture.service';
import { AccountOfJointVenture } from 'src/entity/accounts_of_joint_venture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountOfJointVenture])],
  controllers: [FrontendAccountofJointVentureController],
  providers: [FrontendAccountofJointVentureService],
})
export class FrontendAccountofJointVentureModule {}
