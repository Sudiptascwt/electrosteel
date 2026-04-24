import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LegendHeroSection } from '../../../entity/legend_of_ecl_hero.entity';
import { LegendEclCard } from '../../../entity/legend_ecl_cards.entity';
import { LegendEclVideo } from '../../../entity/legend_ecl_video_section.entity';
import { LegendHeroSectionDto } from 'src/dto/legend_of_ecl_hero.dto';
import { LegendEclCardDto } from 'src/dto/legend_ecl_cards.dto';
import { LegendEclVideoDto } from 'src/dto/legend_ecl_video_section.dto';

@Injectable()
export class LegendOfEclService {
  constructor(
    @InjectRepository(LegendHeroSection)
    private heroRepository: Repository<LegendHeroSection>,
    @InjectRepository(LegendEclCard)
    private cardRepository: Repository<LegendEclCard>,
    @InjectRepository(LegendEclVideo)
    private videoRepository: Repository<LegendEclVideo>,
  ) {}

  async upsertBanner(data: LegendHeroSectionDto) {
    const existingBanners = await this.heroRepository.find();
    const existingBanner = existingBanners[0] || null;
    
    if (existingBanner) {
      await this.heroRepository.update(existingBanner.id, data);
      const updated = await this.heroRepository.findOne({ 
        where: { id: existingBanner.id } 
      });
      return {
        status: true,
        message: 'Banner updated successfully',
        data: updated
      };
    } else {
      const saved = await this.heroRepository.save(data);
      return {
        status: true,
        message: 'Banner created successfully',
        data: saved
      };
    }
  }
  
  async getBanner() {
    const banners = await this.heroRepository.find();
    const banner = banners[0] || null;
    return {
      status: true,
      message: 'Banner fetched successfully',
      data: banner
    };
  }
  
  async upsertCard(data: LegendEclCardDto[]) {
    try {
      await this.cardRepository.clear();
      
      const savedCards = [];
      for (const card of data) {
        const newCard = this.cardRepository.create(card);
        const saved = await this.cardRepository.save(newCard);
        savedCards.push(saved);
      }
      
      return {
        status: true,
        message: `${savedCards.length} cards created successfully`,
        data: savedCards
      };
    } catch (error) {
      return {
        status: false,
        message: 'Error saving cards',
        error: error.message
      };
    }
  }
  
  async findAllCards() {
    const cards = await this.cardRepository.find({
    });
    return {
      status: true,
      message: 'Cards fetched successfully',
      data: cards
    };
  }
  
  async upsertVideo(data: LegendEclVideoDto) {
    const existingVideos = await this.videoRepository.find();
    const existingVideo = existingVideos[0] || null;
    
    if (existingVideo) {
      await this.videoRepository.update(existingVideo.id, data);
      const updated = await this.videoRepository.findOne({ 
        where: { id: existingVideo.id } 
      });
      return {
        status: true,
        message: 'Video updated successfully',
        data: updated
      };
    } else {
      const saved = await this.videoRepository.save(data);
      return {
        status: true,
        message: 'Video created successfully',
        data: saved
      };
    }
  }
  
  async getActiveVideo() {
    const videos = await this.videoRepository.find();
    const video = videos[0] || null;
    return {
      status: true,
      message: 'Video fetched successfully',
      data: video
    };
  }
}