import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Srikalahasthi } from '../../../../entity/Srikalahasthi.entity';
import { SrikalahasthiController } from './srikalahasthi_pipes.controller';
import { SrikalahasthiService } from './srikalahasthi_pipes.service';
@Module({
  imports: [TypeOrmModule.forFeature([Srikalahasthi])],
  controllers: [SrikalahasthiController],
  providers: [SrikalahasthiService],
})
export class SrikalahasthiModule {}
