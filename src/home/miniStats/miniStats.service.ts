import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mini_stats } from '../../entity/mini_stats.entity';
import * as fs from 'fs';
import * as path from 'path';
import { mini_statsDto } from 'src/dto/mini_stats.dto';

@Injectable()
export class miniStatsService {
  constructor(
    @InjectRepository(mini_stats)
    private readonly miniStatsRepository: Repository<mini_stats>,
  ) {}
    async saveMiniStat(data: mini_statsDto | mini_statsDto[] | any) {
        if (!data) {
            throw new Error("No data received");
        }

        // Convert to array (handling different formats)
        let items: mini_statsDto[] = [];
        
        if (Array.isArray(data)) {
            items = data;
        } else if (data && typeof data === 'object') {
            // Handle object with numeric keys (from spread operator)
            const values = Object.values(data);
            if (values.length > 0 && values[0] && typeof values[0] === 'object' && 
                ('title' in values[0] || 'statsCount' in values[0])) {
                items = values as mini_statsDto[];
            } 
            // Single object
            else if (data.title || data.statsCount) {
                items = [data];
            }
        }
        
        if (items.length === 0) {
            throw new Error("No valid items to process");
        }
        
        // Validate each item
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            
            if (!item.title || item.title.trim() === '') {
                throw new Error(`Item ${i + 1}: Title is required`);
            }
            
            if (!item.statsCount) {
                throw new Error(`Item ${i + 1}: Stats count is required`);
            }
            
            // Validate statsCount is numeric
            const statsCountStr = String(item.statsCount);
            const numericPattern = /^[\d,+\sKMkm]+$/;
            if (!numericPattern.test(statsCountStr) && 
                isNaN(Number(statsCountStr.replace(/[,+KMkm]/gi, '')))) {
                throw new Error(`Item ${i + 1}: statsCount must be numeric. Received: "${item.statsCount}"`);
            }
        }

        // Get existing slides
        const existingSlides = await this.miniStatsRepository.find({
            order: { createdAt: 'ASC' }
        });

        // Delete old image files
        if (existingSlides.length > 0) {
            for (const slide of existingSlides) {
                if (slide.cardImage) {
                    const oldFilePath = path.join('./uploads/', slide.cardImage);
                    if (fs.existsSync(oldFilePath)) {
                        try {
                            fs.unlinkSync(oldFilePath);
                        } catch (error) {
                            console.error(`Failed to delete old image: ${oldFilePath}`, error);
                        }
                    }
                }
            }
            
            // ✅ FIXED: Use clear() instead of delete({})
            await this.miniStatsRepository.clear();
        }

        // Create new mini stats
        const newSlides = items.map(item => 
            this.miniStatsRepository.create({
                cardImage: item.cardImage || null,
                cardImageAlt: item.cardImageAlt || null,
                title: item.title.trim(),
                statsCount: String(item.statsCount).trim()
            })
        );

        const savedSlides = await this.miniStatsRepository.save(newSlides);
        return {
            status: true,
            statusCode: existingSlides.length > 0 ? 200 : 201,
            message: existingSlides.length > 0
                ? `${savedSlides.length} mini stat(s) updated successfully.`
                : `${savedSlides.length} mini stat(s) created successfully.`,
            data: savedSlides,
        };
    }

    async getAllMiniStats() {
    const mini_stats = await this.miniStatsRepository.find({
    });

    return {
        status: true,
        statusCode: 200,
        message: mini_stats.length ? 'Mini stat fetched successfully.' : 'No Mini stat found.',
        data: mini_stats,
    };
    }
}