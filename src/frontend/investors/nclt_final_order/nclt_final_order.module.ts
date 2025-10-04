import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendNcltFinalOrderController } from './nclt_final_order.controller';
import { FrontendNcltFinalOrderService } from './nclt_final_order.service';
import { NcltFinalOrder } from 'src/entity/nclt_final_order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NcltFinalOrder])],
  controllers: [FrontendNcltFinalOrderController],
  providers: [FrontendNcltFinalOrderService],
})
export class FrontendNcltFinalOrderModule {}
