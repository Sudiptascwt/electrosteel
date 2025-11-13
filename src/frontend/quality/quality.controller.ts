import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { QualityService } from './quality.service';
import { UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class QualityController {
    constructor(private readonly QualityService: QualityService) {}

    // Get all office details
    @Get('quality-certificates')
    async findAllNoType() {
        return this.QualityService.findAll();
    }

    @Get('quality-certificates/:type')
    async findAllByType(@Param('type') type: string) {
        return this.QualityService.findAll(type);
    }
}
