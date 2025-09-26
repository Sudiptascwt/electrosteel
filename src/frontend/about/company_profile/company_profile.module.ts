import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyProfileController } from './company_profile.controller';
import { CompanyProfileService } from './company_profile.service';
@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [CompanyProfileController],
  providers: [CompanyProfileService],
})
export class CompanyProfileModule {}