import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NcltFinalOrder } from 'src/entity/nclt_final_order.entity';


@Injectable()
export class FrontendNcltFinalOrderService {
  constructor(
    @InjectRepository(NcltFinalOrder)
    private readonly NcltFinalOrderRepo: Repository<NcltFinalOrder>
  ) {}

  async getNcltFinalOrderData() {
    const NcltFinalOrder = await this.NcltFinalOrderRepo.find();
    return {
      statusCode: 200,
      message: NcltFinalOrder.length > 0 
        ? 'Nclt FinalOrder fetched successfully' 
        : 'No Nclt FinalOrder found',
      data: NcltFinalOrder,
    };
  }
}
