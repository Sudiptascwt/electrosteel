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
  import { InnerSliderService } from './inner_slider_image.service';
  import { InnerBannerDto } from '../../dto/inner_banner.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
  import { RolesGuard } from '../../role/roles.guard';
  import { Roles } from '../../role/roles.decorator';
  import { UserRole } from '../../users/user.entity';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
  @Controller('inner-slider')
  export class InnerSliderController {
    constructor(private readonly InnerSliderService: InnerSliderService) {}
  
    @Post('create-slider')
    create(@Body() data: InnerBannerDto) {
      return this.InnerSliderService.createInnerSlider(data);
    }
  
    @Get()
    findAll() {
      return this.InnerSliderService.getAllInnerSliders();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.InnerSliderService.getInnerSlider(+id);
    }

    @Put('update-slider/:id')
    update(
      @Param('id') id: string,
      @Body() data: Partial<InnerBannerDto>, 
    ) {
      return this.InnerSliderService.updateInnerSlider(+id, data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.InnerSliderService.deleteInnerSlider(+id);
    }
  }
  