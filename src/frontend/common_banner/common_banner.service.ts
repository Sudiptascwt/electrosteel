import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonBanner } from 'src/entity/common_banner.entity';

@Injectable()
export class FrontendCommonbannerService {
  constructor(
    @InjectRepository(CommonBanner)
    private readonly CommonBannerRepo: Repository<CommonBanner>,
  ) {}
  //get common_banners data
    async getCommonBannersData() {
        try{
            const common_banners = await this.CommonBannerRepo.find({
                order: {
                id: 'DESC',
                },
            });

            return {
                statusCode: 200,
                message:
                common_banners.length > 0
                    ? 'All common banners successfully'
                    : 'No common banners found',
                data: common_banners,
            };
        } catch(error){
            console.log("error when try to common banners", error);
            throw error;
        }
    }
}