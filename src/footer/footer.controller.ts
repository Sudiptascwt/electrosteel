import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { FooterService } from './footer.service';
import { FooterBelowImagesDto } from 'src/dto/footer_below_images.dto';

@Controller('footer-section')
export class FooterController {
  constructor(private readonly service: FooterService) {}
  @Get()
  async getFooterDetails() {
    return this.service.getFooterDetails();
  }

  @Post()
  async addFooterBerlowImages(@Body() dto: FooterBelowImagesDto) {
    return this.service.addFooterBerlowImages(dto);
  }
}
