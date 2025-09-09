import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBrochures } from '../../entity/product_brochures.entity';
import { ProductBrochuresService } from './product_brochures.service';
import { ProductBrochuresController } from './product_brochures.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProductBrochures])],
    controllers: [ProductBrochuresController],
    providers: [ProductBrochuresService],
})
export class ProductBrochuresModule {}
