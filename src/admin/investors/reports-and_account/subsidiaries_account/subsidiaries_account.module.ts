import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubsidiariesAccount } from '../../../../entity/accounts_of_subsidiaries.entity';
import { SubsidiariesAccountController } from './subsidiaries_account.controller';
import { SubsidiariesAccountService } from './subsidiaries_account.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubsidiariesAccount])],
  controllers: [SubsidiariesAccountController],
  providers: [SubsidiariesAccountService],
})
export class SubsidiariesAccountModule {}
