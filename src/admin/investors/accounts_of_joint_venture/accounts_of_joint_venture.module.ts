import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountOfJointVenture } from '../../../entity/accounts_of_joint_venture.entity';
import { AccountOfJointVentureController } from './accounts_of_joint_venture.controller';
import { AccountOfJointVentureService } from './accounts_of_joint_venture.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountOfJointVenture])],
  controllers: [AccountOfJointVentureController],
  providers: [AccountOfJointVentureService],
})
export class AccountOfJointVentureModule {}
