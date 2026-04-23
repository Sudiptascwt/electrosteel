import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { process_innovationService } from './process_innovation.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRole } from '../../users/user.entity';
import { ProcessInnovationHeroDto } from 'src/dto/process_innovation_hero.dto';
import { PipesToInhospitableKargilDto } from 'src/dto/pipestoinhospitablekargil.dto';
import { ElectrosteelIsroDto } from 'src/dto/electrosteel_isro.dto';
import { ReachingStarsDto } from 'src/dto/ReachingStars.dto';
import { ViaHelicopterDto } from 'src/dto/ViaHelicopter.dto';
import { UltimateDIPipesDto } from 'src/dto/UltimateDIPipes.dto';
import { changiWaterDto } from 'src/dto/changiWater.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about/process-innovation')
export class process_innovationController {
  constructor(private readonly service:process_innovationService) {}

  @Post('/hero/save')
  async saveProcessInnovationHero(@Body() data:ProcessInnovationHeroDto) {
    return this.service.saveProcessInnovationHero(data);
  }

  @Get('/hero')
  async getProcessInnovationHero() {
    return this.service.getProcessInnovationHero();
  }

  @Post('/hospitable-kargil/save')
  async savePipesToInhospitableKargil(@Body() data:PipesToInhospitableKargilDto) {
    return this.service.savePipesToInhospitableKargil(data);
  }

  @Get('/hospitable-kargil')
  async getPipesToInhospitableKargil() {
    return this.service.getPipesToInhospitableKargil();
  } 

  @Post('/electrosteel-isro/save')
  @HttpCode(HttpStatus.OK)
  async saveOrUpdateElectrosteelIsroData(@Body() data: ElectrosteelIsroDto) {
    return this.service.saveOrUpdateElectrosteelIsroData(data);
  }

  @Get('/electrosteel-isro')
  async getAllElectrosteelIsroData() {
    return this.service.getAllElectrosteelIsroData();
  }

  @Post('reaching-stars/save')
  @HttpCode(HttpStatus.OK)
  async saveReachingStars(@Body() data: ReachingStarsDto) {
    return this.service.saveReachingStars(data);
  }

  @Get('reaching-stars')
  async getReachingStars() {
    return this.service.getReachingStars();
  }

  @Post('via-helicopter/save')
  @HttpCode(HttpStatus.OK)
  async saveViaHelicopter(@Body() data: ViaHelicopterDto) {
    return this.service.saveViaHelicopter(data);
  }

  @Get('via-helicopter')
  async getViaHelicopter() {
    return this.service.getViaHelicopter();
  }

  @Post('ultimate-DIPipes/save')
  @HttpCode(HttpStatus.OK)
  async saveultimateDIPipes (@Body() data: UltimateDIPipesDto) {
    return this.service.saveultimateDIPipes(data);
  }

  @Get('ultimate-DIPipes')
  async getultimateDIPipes() {
    return this.service.getultimateDIPipes();
  }

  @Post('changiWater/save')
  @HttpCode(HttpStatus.OK)
  async savechangiWater (@Body() data: changiWaterDto) {
    return this.service.savechangiWater(data);
  }

  @Get('changiWater')
  async getchangiWater() {
    return this.service.getchangiWater();
  }
}