import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockYard } from 'src/entity/stockyard.entity';


@Injectable()
export class StockyardsService {
  constructor(
    @InjectRepository(StockYard)
    private readonly StockYardRepo: Repository<StockYard>,
  ) {}

  async getStockyardsData() {
    const stockyards = await this.StockYardRepo.find();

    return {
      statusCode: 200,
      message: stockyards.length > 0 
        ? 'Stockyards fetched successfully' 
        : 'No stockyards found',
      data: stockyards
    };
  }
}
