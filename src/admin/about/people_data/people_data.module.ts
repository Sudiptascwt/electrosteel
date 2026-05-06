// src/modules/sections/sections.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { peopleDataController } from './people_data.controller';
import { peopleDataService } from './people_data.service';

import { SectionContent } from '../../../entity/section_contents.entity';
import { CardContent } from '../../../entity/card_contents.entity';
import { Testimonial } from '../../../entity/testimonials.entity';
import { Reward } from '../../../entity/rewards.entity';
import { Blogs } from 'src/entity/blogs.entity';


// import { ButtonSwiperImage } from './entities/button-swiper-image.entity';
// import { SectionsConfig } from './entities/sections-config.entity';
// import { PageContent } from './entities/page-content.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SectionContent,
      CardContent,
      Testimonial,
      Reward,
      Blogs
    //   ButtonSwiperImage,
    //   SectionsConfig,
    //   PageContent,
    ]),
  ],
  controllers: [peopleDataController],
  providers: [peopleDataService],
  exports: [peopleDataService],
})
export class peopleDataModule {}