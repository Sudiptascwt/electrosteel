import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { BoardCommitteTypeService } from './board_committee.service';
import { BoardCommitteTypeDto } from '../../../dto/board_committee_type.dto';
import { BoardCommitteDetailsDto } from 'src/dto/board_committe_details.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about')
export class BoardCommitteTypeController {
    constructor(private readonly BoardCommitteTypeervice: BoardCommitteTypeService) {}

    // Create committee type
    @Post('board-committe-type')
    async create(@Body() createDto: BoardCommitteTypeDto) {
        return this.BoardCommitteTypeervice.create(createDto);
    }

    // Get all committee type
    @Get('board-committe-type')
    async findAll() {
        return this.BoardCommitteTypeervice.findAll();
    }

    // Get committee type by ID
    @Get('board-committe-type/:id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.BoardCommitteTypeervice.findById(id);
    }

    // Update committee type
    @Put('board-committe-type/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: BoardCommitteTypeDto
    ) {
        return this.BoardCommitteTypeervice.update(id, updateDto);
    }

    // Delete committee type
    @Delete('board-committe-type/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.BoardCommitteTypeervice.delete(id);
    }

    // Create committee details
    @Post('board-committe-details')
    async createBoardCommitteDetails(@Body() createDto: BoardCommitteDetailsDto) {
        return this.BoardCommitteTypeervice.createBoardCommitteDetails(createDto);
    }

    // Get all committee details
    @Get('board-committe-details')
    async findAllBoardCommitteDetails() {
        return this.BoardCommitteTypeervice.findAllBoardCommitteDetails();
    }

    // Get committee details by ID
    @Get('board-committe-details/:id')
    async findBoardCommitteDetailsById(@Param('id', ParseIntPipe) id: number) {
        return this.BoardCommitteTypeervice.findBoardCommitteDetailsById(id);
    }

    // Update committee details
    @Put('board-committe-details/:id')
    async updateBoardCommitteDetails(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: BoardCommitteDetailsDto
    ) {
        return this.BoardCommitteTypeervice.updateBoardCommitteDetails(id, updateDto);
    }

    // Delete committee details
    @Delete('board-committe-details/:id')
    async deleteBoardCommitteDetails(@Param('id', ParseIntPipe) id: number) {
        return this.BoardCommitteTypeervice.deleteBoardCommitteDetails(id);
    }

}
