import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockyardsController } from './stockyards.controller';
import { StockyardsService } from './stockyards.service';
import { StockYard } from 'src/entity/stockyard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockYard])],
  controllers: [StockyardsController],
  providers: [StockyardsService],
})
export class StockyardsModule {}
