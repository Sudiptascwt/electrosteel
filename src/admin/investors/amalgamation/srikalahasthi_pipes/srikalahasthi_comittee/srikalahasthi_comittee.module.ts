import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrikalahasthiComittee } from '../../../../../entity/srikalahasthi_comittee.entity';
import { SrikalahasthiCommiteeCommiteeController } from './srikalahasthi_comittee.controller';
import { SrikalahasthiCommiteeService } from './srikalahasthi_comittee.service';
@Module({
  imports: [TypeOrmModule.forFeature([SrikalahasthiComittee])],
  controllers: [SrikalahasthiCommiteeCommiteeController],
  providers: [SrikalahasthiCommiteeService],
})
export class SrikalahasthiCommiteeModule {}
