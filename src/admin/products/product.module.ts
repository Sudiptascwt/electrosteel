import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductApplicationsService } from './product.service';
import { ProductApplicationsController } from './product.controller';
import { product_applications } from '../../entity/product_application.entity';
import { product_application_images } from '../../entity/product_application_images.entity'

@Module({
  imports: [TypeOrmModule.forFeature([product_applications, product_application_images])],
  controllers: [ProductApplicationsController],
  providers: [ProductApplicationsService],
})
export class ProductApplicationsModule {}
