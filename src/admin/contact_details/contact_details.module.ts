import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactDetails } from '../../entity/contact_details.entity';
import { ContactDetailsService } from './contact_details.service';
import { ContactDetailsController } from './contact_details.controller';
import { SocialPlatform } from 'src/entity/social_platform.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ContactDetails, SocialPlatform])],
    controllers: [ContactDetailsController],
    providers: [ContactDetailsService],
})
export class ContactDetailsModule {}
