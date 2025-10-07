import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockYard } from '../../../entity/stockyard.entity';
import { StockYardService } from './stockyard.service';
import { StockYardController } from './stockyard.controller';
import { BoardCommitteDetails } from 'src/entity/board_committe_details.entity';

@Module({
    imports: [TypeOrmModule.forFeature([StockYard,BoardCommitteDetails])],
    controllers: [StockYardController],
    providers: [StockYardService],
})
export class StockYardModule {}
