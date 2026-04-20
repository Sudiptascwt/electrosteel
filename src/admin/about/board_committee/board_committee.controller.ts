import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { BoardCommitteTypeService } from './board_committee.service';
import { BoardCommitteTypeDto } from '../../../dto/board_committee_type.dto';
import { BoardCommitteDetailsDto } from 'src/dto/board_committe_details.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { board_commitee_hero_dataDto } from 'src/dto/board_commitee_hero_data.dto';
import { BoardCommitteDataDto } from 'src/dto/board_commitee_data.dto'; 

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about')
export class BoardCommitteTypeController {
    constructor(private readonly BoardCommitteTypeervice: BoardCommitteTypeService) {}



    //////////////////////////////////////////
    @Post('board-committe-hero-data/save')
    async boardCommitteHeroData(@Body() createDto: board_commitee_hero_dataDto) {
        return this.BoardCommitteTypeervice.boardCommitteHeroData(createDto);
    }

    // Get all committee type
    @Get('board-committe-hero-data')
    async findAllboardCommitteHeroData() {
        return this.BoardCommitteTypeervice.findAllboardCommitteHeroData();
    }

    @Post('board-committe-data/save')
    async saveboardCommitteData(@Body() createDto: BoardCommitteDataDto) {
        return this.BoardCommitteTypeervice.saveboardCommitteData(createDto);
    }

    // Get all committee type
    @Get('board-committe-data')
    async findAllboardCommitteData() {
        return this.BoardCommitteTypeervice.findAllboardCommitteData();
    }

}
