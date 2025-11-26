import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorporateProfile } from '../../../entity/corporate_profile.entity';
import { CorporateProfileService } from './corporate_profile.service';
import { CorporateProfileController } from './corporate_profile.controller';
import { CorporateProfileTestimonial } from 'src/entity/coporate_profile_testimonial.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CorporateProfile, CorporateProfileTestimonial])],
    controllers: [CorporateProfileController],
    providers: [CorporateProfileService],
})
export class CorporateProfileModule {}
