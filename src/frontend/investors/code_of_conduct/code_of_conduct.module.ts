import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendCodeOfConductController } from './code_of_conduct.controller';
import { FrontendCodeOfConductService } from './code_of_conduct.service';
import { Conduct } from 'src/entity/conduct.entity';
import { Policies } from 'src/entity/policies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conduct, Policies])],
  controllers: [FrontendCodeOfConductController],
  providers: [FrontendCodeOfConductService],
})
export class FrontendCodeOfConductModule {}
