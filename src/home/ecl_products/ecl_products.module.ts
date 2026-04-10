import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ecl_productsController } from './ecl_products.controller'
import { ecl_productsService } from './ecl_products.service';
import { ecl_products } from 'src/entity/ecl_products.entity';
import { headings } from 'src/entity/headings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ecl_products, headings])],
  controllers: [ecl_productsController],
  providers: [ecl_productsService],
  exports: [ecl_productsService],
})
export class ecl_productsModule {}