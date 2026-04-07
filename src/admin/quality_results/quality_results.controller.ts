// import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
// import { QualityResultsService } from './pipe_art.service';
// import { QualityResultsDto } from '../../dto/pipe_art.dto';
// import { QualityResultsDetailDto } from 'src/dto/pipe_art_details.dto';
// import { UseGuards } from '@nestjs/common';
// import { RolesGuard } from '../../role/roles.guard';
// import { Roles } from '../../role/roles.decorator';
// import { UserRole } from '../users/user.entity';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
// @Controller()
// export class QualityResultsController {
//     constructor(private readonly QualityResultsService: QualityResultsService) {}

//     // Create office details
//     @Post('QualityResults')
//     async create(@Body() createDto: QualityResultsDto) {
//         return this.QualityResultsService.create(createDto);
//     }

//     // Get all office details
//     @Get('QualityResults')
//     async findAll() {
//         return this.QualityResultsService.findAll();
//     }

//     // Get office details by ID
//     @Get('QualityResults/:id')
//     async findById(@Param('id', ParseIntPipe) id: number) {
//         return this.QualityResultsService.findById(id);
//     }

//     // Update office details
//     @Put('QualityResults/:id')
//     async update(
//         @Param('id', ParseIntPipe) id: number,
//         @Body() updateDto: QualityResultsDto
//     ) {
//         return this.QualityResultsService.update(id, updateDto);
//     }

//     // Delete office details
//     @Delete('QualityResults/:id')
//     async delete(@Param('id', ParseIntPipe) id: number) {
//         return this.QualityResultsService.delete(id);
//     }
// }
