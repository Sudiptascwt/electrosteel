import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LegendOfEclService } from './legend_of_ecls.service';
import { LegendHeroSectionDto } from 'src/dto/legend_of_ecl_hero.dto';
import { LegendEclCardDto } from 'src/dto/legend_ecl_cards.dto';
import { LegendEclVideoDto } from 'src/dto/legend_ecl_video_section.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { UserRole } from 'src/admin/users/user.entity';
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about/legend-of-ecl')
export class LegendOfEclController {
  constructor(private readonly legendOfEclService: LegendOfEclService) {}

  @Post('banner/upsert')
  @HttpCode(HttpStatus.OK)
  async upsertBanner(@Body() data: LegendHeroSectionDto) {
    return this.legendOfEclService.upsertBanner(data);
  }
  
  @Get('banner/active')
  async getBanner() {
    return this.legendOfEclService.getBanner();
  }
  
  @Post('card/upsert')
  @HttpCode(HttpStatus.OK)
  async upsertCard(@Body() data: LegendEclCardDto[]) {
    return this.legendOfEclService.upsertCard(data);
  }
  
  @Get('cards')
  async findAllCards() {
    return this.legendOfEclService.findAllCards();
  } 
  
  @Post('video/upsert')
  @HttpCode(HttpStatus.OK)
  async upsertVideo(@Body() data: LegendEclVideoDto) {
    return this.legendOfEclService.upsertVideo(data);
  } 
  
  @Get('video/active')
  async getActiveVideo() {
    return this.legendOfEclService.getActiveVideo();
  }
}