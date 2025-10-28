import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { officeDetails } from 'src/entity/office_section.entity';
import { SocialPlatform } from 'src/entity/social_platform.entity';
import { FooterBelowImages } from 'src/entity/footer_below_images.entity';
import { FooterBelowImagesDto } from 'src/dto/footer_below_images.dto';

@Injectable()
export class FooterService {
  constructor(
    @InjectRepository(officeDetails)
    private readonly repo: Repository<officeDetails>,
    @InjectRepository(SocialPlatform)
    private readonly SocialPlatformrepo: Repository<SocialPlatform>,
    @InjectRepository(FooterBelowImages)
    private readonly FooterBelowImagesrepo: Repository<FooterBelowImages>,
  ) {}

  async getFooterDetails() {
    const offices = await this.repo.find({});
    const social_platforms = await this.SocialPlatformrepo.find({});
    const footer_below_images = await this.FooterBelowImagesrepo.find({});
    return { statusCode: 200, message: 'Footer details fetched successfully', data: { offices, social_platforms,footer_below_images } };
  }

  async addFooterBerlowImages(dto: FooterBelowImagesDto) {
    const createdImage = this.FooterBelowImagesrepo.create(dto);
    await this.FooterBelowImagesrepo.save(createdImage);

    return {
      statusCode: 201,
      message: 'Footer below image added successfully',
      data: createdImage,
    };
  }

  async updateFooterBelowImages(id: number, dto: FooterBelowImagesDto) {
    const footer_image = await this.FooterBelowImagesrepo.findOne({ where: {id}});
    if(!footer_image){
      throw new NotFoundException('Footer below image not found');
    }
    Object.assign(footer_image, dto);
    await this.FooterBelowImagesrepo.save(footer_image);
    return {
      statusCode:200,
      message: 'Footer below image updated successfully.',
      data: footer_image
    }
  }
}
