import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jolsadhana } from '../../entity/jol_sadhana.entity';
import { JolsadhanaController } from './jol_sadhana.controller';
import { JolsadhanaService } from './jol_sadhana.service';

@Module({
  imports: [TypeOrmModule.forFeature([Jolsadhana])],
  controllers: [JolsadhanaController],
  providers: [JolsadhanaService],
})
export class JolsadhanaModule {}
