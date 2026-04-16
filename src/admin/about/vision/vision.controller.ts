import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { AboutService } from './vision.service';
import { VisionDto } from '../../../dto/vision.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { VisionPrinciplesDto } from '../../../dto/vision_principles.dto';
import { headings } from 'src/entity/headings.entity';
import { headingsDto } from 'src/dto/headings.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about')
export class AboutController {
    constructor(private readonly AboutService: AboutService) {}

    // Create Vision banner
    @Post('vision-banner/save')
    async createVisionBanner(@Body() createDto: headingsDto) {
        return this.AboutService.createVisionBanner(createDto);
    }

    @Get('vision-banner')
    async findVisionBanner() {
        return this.AboutService.findVisionBanner();
    }

    @Post('vision/save')
    async createVision(@Body() createDto: VisionDto) {
        return this.AboutService.createVision(createDto);
    }

    // Get all About
    @Get('vision')
    async findAllVision() {
        return this.AboutService.findAllVision();
    }

    ///////////////mission////////////////////
    @Post('mission/save')
    async createMission(@Body() createDto: VisionDto) {
        return this.AboutService.createMission(createDto);
    }

    // Get all About
    @Get('mission')
    async findAllMission() {
        return this.AboutService.findAllMission();
    }


    //////////// vision principles//////////////////

    @Post('vision/principles')
    async createPrinciples(@Body() createDto: any) {
        if (!createDto.title) {
            throw new BadRequestException('Request body must contain either "heading" or "title" field');
        }
        return this.AboutService.createPrinciples(createDto);
    }

    // Get all Vision principles
    @Get('vision/principles/all')
    async findAllcreatePrinciples() {
        return this.AboutService.findAllPrinciples();
    }
}
