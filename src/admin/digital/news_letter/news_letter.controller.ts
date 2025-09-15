import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { NewsLetterService } from './news_letter.service';
import { NewsLetterDto } from '../../../dto/news_letter.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('digital/newsletter')
export class NewsLetterController {
    constructor(private readonly NewsLetterervice: NewsLetterService) {}

    // Create committee type
    @Post()
    async create(@Body() createDto: NewsLetterDto) {
        return this.NewsLetterervice.create(createDto);
    }

    // Get all committee type
    @Get()
    async findAll() {
        return this.NewsLetterervice.findAll();
    }

    // Get committee type by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.NewsLetterervice.findById(id);
    }

    // Update committee type
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: NewsLetterDto
    ) {
        return this.NewsLetterervice.update(id, updateDto);
    }

    // Delete committee type
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.NewsLetterervice.delete(id);
    }
}
