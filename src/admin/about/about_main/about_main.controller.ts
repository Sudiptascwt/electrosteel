import { Controller, Post, Get, Body } from '@nestjs/common';
import { AboutMainService } from './about_main.service';
import { AboutMainDto } from '../../../dto/about_main.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../../admin/users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { growing_strength_dataDto } from '../../../dto/growing_strength_data.dto';
import { AboutDuctileIronDto } from 'src/dto/about_ductile_iron.dto';
import { ManufacturingFacilitiesDto } from 'src/dto/manufacturing_facilities.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about-main')
export class AboutMainController {
  constructor(private readonly service: AboutMainService) {}

  @Post('save')
  async save(@Body() data: AboutMainDto) {
    return this.service.saveAboutMain(data);
  }

  @Get()
  async getAllAboutMainData() {
    return this.service.getAllAboutMainData();
  }

  @Post('growing_strength/save')
  async growingStrengthSave(@Body() data: growing_strength_dataDto) { 
    return this.service.GrowingStrengthsave(data);
  }

  @Get('growing_strength')
  async getAllGrowingStrengthData() {
    return this.service.getAllGrowingStrengthData();
  }

  @Post('ductile-iron/save')
  async saveDuctileIronPipes(@Body() data: AboutDuctileIronDto) { 
    return this.service.saveDuctileIronPipes(data);
  }

  @Get('ductile-iron')
  async getAllDuctileIronPipes() {
    return this.service.getAllDuctileIronPipes();
  }

  //manufacturing facilities
  @Post('manufacturing-facilities/save')
  async saveManufacturingfacilities(@Body() data: ManufacturingFacilitiesDto) { 
    return this.service.saveManufacturingfacilities(data);
  }

  @Get('manufacturing-facilities')
  async getAllManufacturingfacilities() {
    return this.service.getAllManufacturingfacilities();
  }

  //our people
  @Post('people-data/save')
  async savePeopleData(@Body() data: ManufacturingFacilitiesDto) { 
    return this.service.savePeopleData(data);
  }

  @Get('people-data')
  async getAllPeopleData() {
    return this.service.getAllPeopleData();
  }
}