import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { srikalahasthiCodeOfConduct } from '../../../../../entity/srikalahasthi_code_of_conduct.entity';
import { srikalahasthiCodeOfConductController } from './srikalahasthi_code_of_conduct.controller';
import { srikalahasthiCodeOfConductService } from './srikalahasthi_code_of_conduct.service';
@Module({
  imports: [TypeOrmModule.forFeature([srikalahasthiCodeOfConduct])],
  controllers: [srikalahasthiCodeOfConductController],
  providers: [srikalahasthiCodeOfConductService],
})
export class srikalahasthiCodeOfConductModule {}
