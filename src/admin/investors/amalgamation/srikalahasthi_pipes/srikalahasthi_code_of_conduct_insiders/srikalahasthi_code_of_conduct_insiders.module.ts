import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrikalahasthiCodeOfConductInsiders } from '../../../../../entity/srikalahasthi_code_of_conduct_insiders.entity';
import { SrikalahasthiCodeOfConductInsidersController } from './srikalahasthi_code_of_conduct_insiders.controller';
import { SrikalahasthiCodeOfConductInsidersService } from './srikalahasthi_code_of_conduct_insiders.service';
@Module({
  imports: [TypeOrmModule.forFeature([SrikalahasthiCodeOfConductInsiders])],
  controllers: [SrikalahasthiCodeOfConductInsidersController],
  providers: [SrikalahasthiCodeOfConductInsidersService],
})
export class SrikalahasthiCodeOfConductInsidersModule {}
