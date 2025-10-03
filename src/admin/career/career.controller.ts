import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { CareerService } from './career.service';
import { ElectroSteelSliderDto } from '../../dto/electrosteel_slider.dto';
import { CreateLifeElectrosteelContentDto } from 'src/dto/life_electrosteel_content.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FraudAlertDto } from 'src/dto/fraud_alert.dto';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller('career')
export class CareerController {
    constructor(private readonly ElectrosteelSliderService: CareerService) {}

    // Create ElectroSteelSlider
    @Post('electrosteelslider')
    async create(@Body() createDto: ElectroSteelSliderDto) {
        return this.ElectrosteelSliderService.create(createDto);
    }

    // Get all ElectroSteelSlider
    @Get('electrosteelslider')
    async findAll() {
        return this.ElectrosteelSliderService.findAll();
    }

    // Get ElectroSteelSlider by ID
    @Get('electrosteelslider/:id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.ElectrosteelSliderService.findById(id);
    }

    // Update ElectroSteelSlider
    @Put('electrosteelslider/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: ElectroSteelSliderDto
    ) {
        return this.ElectrosteelSliderService.update(id, updateDto);
    }

    // Delete ElectroSteelSlider
    @Delete('electrosteelslider/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.ElectrosteelSliderService.delete(id);
    }

  /////////////electrosteel career life content//////
    @Post('career-life-content')
    async createLifeContent(@Body() createDto: CreateLifeElectrosteelContentDto) {
        return this.ElectrosteelSliderService.createLifeContent(createDto);
    }

    // Get all career-life-contents
    @Get('career-life-content')
    async findAllLifeContents() {
        return this.ElectrosteelSliderService.findAllLifeContents();
    }

    // Get career-life-content by ID
    @Get('career-life-content/:id')
    async findLifeContentById(@Param('id', ParseIntPipe) id: number) {
        return this.ElectrosteelSliderService.findLifeContentById(id);
    }

    // Update career-life-content
    @Put('career-life-content/:id')
    async (
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: CreateLifeElectrosteelContentDto
    ) {
        return this.ElectrosteelSliderService.updateLifeContent(id, updateDto);
    }

    // Delete career-life-content
    @Delete('career-life-content/:id')
    async deleteLifeContent(@Param('id', ParseIntPipe) id: number) {
        return this.ElectrosteelSliderService.deleteLifeContent(id);
    }



    /////////career fraud alert//////////////
    @Post('career-fraud-alert')
    async createFraudAlert(@Body() createDto: FraudAlertDto) {
        return this.ElectrosteelSliderService.createFraudAlert(createDto);
    }

    // Get all career-life-contents
    @Get('career-fraud-alert')
    async findFraudAlert() {
        return this.ElectrosteelSliderService.findFraudAlert();
    }

    // Get career-life-content by ID
    @Get('career-fraud-alert/:id')
    async findFraudAlertById(@Param('id', ParseIntPipe) id: number) {
        return this.ElectrosteelSliderService.findFraudAlertById(id);
    }

    // Update career-life-content
    @Put('career-fraud-alert/:id')
    async updateFraudAlert(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: FraudAlertDto
    ) {
        return this.ElectrosteelSliderService.updateFraudAlert(id, updateDto);
    }

    // Delete career-life-content
    @Delete('career-fraud-alert/:id')
    async deleteFraudAlert(@Param('id', ParseIntPipe) id: number) {
        return this.ElectrosteelSliderService.deleteFraudAlert(id);
    }


}
