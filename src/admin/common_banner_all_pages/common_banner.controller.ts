import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException, HttpStatus } from '@nestjs/common';
import { CommonBannerService } from './common_banner.service';
import { CommonBannerDto } from '../../dto/common_banner.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller('pages/common/banner')
export class CommonBannerController {
    constructor(private readonly CommonBannerService: CommonBannerService) {}

    // Create banner for pages
    @Post()
    async create(@Body() createDto: CommonBannerDto) {
        if(createDto.page_name==null){
            throw new BadRequestException('Page name is required');
        }
        return this.CommonBannerService.create(createDto);
    }

    // Get all banners for pages
    @Get()
    async findAll() {
        return this.CommonBannerService.findAll();
    }

    // Get banner by id
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.CommonBannerService.findById(id);
    }

    // Update banner
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: CommonBannerDto
    ) {
        return this.CommonBannerService.update(id, updateDto);
    }

    // Delete banner by id
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.CommonBannerService.delete(id);
    }

    @Get('page/:page_name')
    async getBannersByPageName(@Param('page_name') pageName: string) {
        const banners = await this.CommonBannerService.findByPageName(pageName);

        return {
        status: true,
        statusCode: HttpStatus.OK,
        message: banners.length ? 'Banners for the page fetched successfully' : 'No banners found',
        data: banners,
        };
    }
}
