import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Body,
    UseInterceptors,
    UploadedFile,
    UseGuards,
  } from '@nestjs/common';
  import { BelowBannerService } from './below_banner.service'
  import { BelowBannerDto } from '../../../../dto/below_banner.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import { JwtAuthGuard } from '../../../../auth/jwt-auth.guard';
  import { RolesGuard } from '../../../../role/roles.guard';
  import { Roles } from '../../../../role/roles.decorator';
  import { UserRole } from '../../../users/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
  @Controller('about/company-profile/below-banner')
  export class BelowBannerController {
    constructor(private readonly BelowBannerService: BelowBannerService) {}
  
    @Post()
    create(@Body() data: BelowBannerDto) {
      return this.BelowBannerService.createBelowBanner(data);
    }
  
    @Get()
    findAll() {
      return this.BelowBannerService.getAllBelowBanners();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.BelowBannerService.getBelowBanner(+id);
    }

    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() data: Partial<BelowBannerDto>, 
    ) {
      return this.BelowBannerService.updateBelowBanner(+id, data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.BelowBannerService.deleteBelowBanner(+id);
    }
  }
  