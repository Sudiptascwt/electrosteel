import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sustainabilityService } from './sustainability.service';
import { sustainabilityController } from './sustainability.controller';
import { AllBanner } from 'src/entity/all_page_banner_image.entity';
import { Blogs } from 'src/entity/blogs.entity';
import { AllProducts } from '../../entity/all_products.entity';
@Module({
    imports: [TypeOrmModule.forFeature([AllBanner,Blogs, AllProducts])],
    controllers: [sustainabilityController],
    providers: [sustainabilityService],
})
export class sustainabilityModule {}
