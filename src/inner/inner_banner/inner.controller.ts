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
  import { InnerService } from './inner.service';
  import { InnerBannerDto } from '../../dto/inner_banner.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
  import { RolesGuard } from '../../role/roles.guard';
  import { Roles } from '../../role/roles.decorator';
  import { UserRole } from '../../users/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
  @Controller('inner-banners')
  export class InnerController {
    constructor(private readonly InnerService: InnerService) {}
  
    @Post('create-banner')
    create(@Body() data: InnerBannerDto) {
      return this.InnerService.createInnerBanner(data);
    }
  
    @Get()
    findAll() {
      return this.InnerService.getAllInnerBanners();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.InnerService.getInnerBanner(+id);
    }

    @Put('update-banner/:id')
    update(
      @Param('id') id: string,
      @Body() data: Partial<InnerBannerDto>, 
    ) {
      return this.InnerService.updateInnerBanner(+id, data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.InnerService.deleteInnerBanner(+id);
    }
  }
  