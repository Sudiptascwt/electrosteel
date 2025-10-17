import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtherProductsService } from './other_products.service';
import { OtherProductsController } from './other_products.controller';
import { OtherProducts } from 'src/entity/other_products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OtherProducts])],
  controllers: [OtherProductsController],
  providers: [OtherProductsService],
})
export class OtherProductsModule {}
