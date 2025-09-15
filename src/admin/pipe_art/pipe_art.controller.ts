import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PipeArtService } from './pipe_art.service';
import { PipeArtDto } from '../../dto/pipe_art.dto';
import { PipeArtDetailDto } from 'src/dto/pipe_art_details.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller()
export class PipeArtController {
    constructor(private readonly PipeArtService: PipeArtService) {}

    // Create office details
    @Post('pipeart')
    async create(@Body() createDto: PipeArtDto) {
        return this.PipeArtService.create(createDto);
    }

    // Get all office details
    @Get('pipeart')
    async findAll() {
        return this.PipeArtService.findAll();
    }

    // Get office details by ID
    @Get('pipeart/:id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.PipeArtService.findById(id);
    }

    // Update office details
    @Put('pipeart/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: PipeArtDto
    ) {
        return this.PipeArtService.update(id, updateDto);
    }

    // Delete office details
    @Delete('pipeart/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.PipeArtService.delete(id);
    }

    ////////////////pipe art details////////////////////

    // Create pipe art details
    @Post('pipeart-details')
    async createPipeDetails(@Body() detailsDto: PipeArtDetailDto) {
        return this.PipeArtService.addPipeDetails(detailsDto);
    }

    // Get all office details
    @Get('pipeart-details')
    async findAllPipeDetails() {
        return this.PipeArtService.getAllPipeDetails();
    }

    // Get office details by ID
    @Get('pipeart-details/:id')
    async findByIdPipeDetails(@Param('id', ParseIntPipe) id: number) {
        return this.PipeArtService.getPipeDetails(id);
    }

    // Update office details
    @Put('pipeart-details/:id')
    async updatePipeDetails(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDetailsDto: PipeArtDetailDto
    ) {
        return this.PipeArtService.updatePipeDetails(id, updateDetailsDto);
    }

    // Delete office details
    @Delete('pipeart-details/:id')
    async deletePipeDetails(@Param('id', ParseIntPipe) id: number) {
        return this.PipeArtService.deletePipeDetails(id);
    }
}
