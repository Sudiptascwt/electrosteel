import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrikalahasthiInvestorContact } from '../../../../../entity/srikalahasthi_investor_contact.entity';
import { SrikalahasthiInvestorContactController } from './srikalahasthi_investor_contact.controller';
import { SrikalahasthiInvestorContactService } from './srikalahasthi_investor_contact.service';
@Module({
  imports: [TypeOrmModule.forFeature([SrikalahasthiInvestorContact])],
  controllers: [SrikalahasthiInvestorContactController],
  providers: [SrikalahasthiInvestorContactService],
})
export class SrikalahasthiInvestorContactModule {}