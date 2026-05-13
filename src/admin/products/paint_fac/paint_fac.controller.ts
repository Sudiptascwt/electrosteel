// src/fac/fac.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    HttpStatus,
    BadRequestException,
} from '@nestjs/common';
import { FacService } from './paint_fac.service';
import { CreateFacDto } from '../../../dto/paint_fac.dto';

@Controller('product/paint/fac')
export class FacController {
    constructor(private readonly facService: FacService) {}

    // UPSERT - Create or update by category (POST request with category in body)
    @Post('upsert')
    async upsertByCategory(@Body() createFacDto: CreateFacDto) {
        try {
            if (!createFacDto.category) {
                throw new BadRequestException('Category is required');
            }
            
            const data = await this.facService.upsertByCategory(createFacDto);
            
            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: 'Product upserted successfully',
                data,
            };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    // GET by category - /product/paint/fac/category/:category
    @Get('category/:category')
    async findByCategory(@Param('category') category: string) {
        try {
            if (!category) {
                throw new BadRequestException('Category is required');
            }
            
            const data = await this.facService.findByCategory(category);
            
            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: 'Product fetched successfully',
                data,
            };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}