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
  import { FeatureService } from './feature.service';
  import { InnerFeatureDto } from '../../../dto/inner_feature.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
  import { RolesGuard } from '../../../role/roles.guard';
  import { Roles } from '../../../role/roles.decorator';
  import { UserRole } from '../../../users/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
  @Controller('about/company-profile/feature')
  export class FeatureController {
    constructor(private readonly FeatureService: FeatureService) {}
  
    @Post()
    create(@Body() data: InnerFeatureDto) {
      return this.FeatureService.createInnerFeature(data);
    }
  
    @Get()
    findAll() {
      return this.FeatureService.getAllInnerFeatures();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.FeatureService.getInnerFeature(+id);
    }

    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() data: Partial<InnerFeatureDto>, 
    ) {
      return this.FeatureService.updateInnerFeature(+id, data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.FeatureService.deleteInnerFeature(+id);
    }
  }
  