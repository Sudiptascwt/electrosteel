import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { QualityFeaturesService } from './quality_features.service';
import { AllCertificatesDto } from 'src/dto/all_certificates.dto';
import { PoliciesDto } from 'src/dto/policies.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller('quality')
export class QualityFeaturesController {
    constructor(private readonly QualityCertificatesService: QualityFeaturesService) {}

    // Create certificate details
    @Post('certificates')
    async create(@Body() createDto: AllCertificatesDto) {
        return this.QualityCertificatesService.create(createDto);
    }

    // Get all certificate details
    @Get('certificates')
    async findAll() {
        return this.QualityCertificatesService.findAll();
    }

    // Get certificate details by ID
    @Get('certificates/:id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.QualityCertificatesService.findById(id);
    }

    // Update certificate details
    @Put('certificates/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: AllCertificatesDto
    ) {
        return this.QualityCertificatesService.update(id, updateDto);
    }

    // Delete certificate details
    @Delete('certificates/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.QualityCertificatesService.delete(id);
    }

    ////////////// quality policy pdf //////////////
    // Create policy details
    @Post('policy')
    async createPolicy(@Body() createDto: PoliciesDto) {
        return this.QualityCertificatesService.createPolicyPdf(createDto);
    }
   @Get('policy')
    async findAllPolicies() {
        return this.QualityCertificatesService.findAllPolicies();
    }

    // Get policy details by ID
    @Get('policy/:id')
    async findPolicyById(@Param('id', ParseIntPipe) id: number) {
        return this.QualityCertificatesService.findPolicyById(id);
    }

    // Update policy details
    @Put('policy/:id')
    async updatePolicy(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: PoliciesDto
    ) {
        return this.QualityCertificatesService.updatePolicy(id, updateDto);
    }

    // Delete policy details
    @Delete('policy/:id')
    async deletePolicy(@Param('id', ParseIntPipe) id: number) {
        return this.QualityCertificatesService.deletePolicy(id);
    }
}
