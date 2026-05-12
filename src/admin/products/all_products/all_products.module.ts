import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllProducts } from '../../../entity/all_products.entity';
import { AllProductsService } from './all_products.service';
import { AllProductsController } from './all_products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AllProducts])],
  controllers: [AllProductsController],
  providers: [AllProductsService],
})
export class AllProductsModule {}
