import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertisement } from '../../entity/advertisement.entity';
import { home_slides } from '../../entity/home_slides.entity';
import { mini_stats } from '../../entity/mini_stats.entity';
import { OverviewSection } from '../../entity/overview_section.entity';
import { ecl_products } from '../../entity/ecl_products.entity';
import { headings } from 'src/entity/headings.entity';
import { growing_from_strength } from '../../entity/growing_from_strength.entity';
import {water_section } from '../../entity/water_section.entity';
import { Milestone } from '../../entity/milestones.entity';
@Injectable()
export class HomeService {
  constructor(

    @InjectRepository(Advertisement)
    private readonly AdvertisementRepo: Repository<Advertisement>,

    @InjectRepository(home_slides)
    private readonly home_slidesRepo: Repository<home_slides>,

    @InjectRepository(mini_stats)
    private readonly mini_statsRepo: Repository<mini_stats>,

    @InjectRepository(OverviewSection)
    private readonly OverviewSectionRepo: Repository<OverviewSection>,

    @InjectRepository(headings)
    private readonly headingsRepository: Repository<headings>,

    @InjectRepository(ecl_products)
    private readonly ecl_productsRepository: Repository<ecl_products>,

    @InjectRepository(growing_from_strength)
    private readonly growing_from_strengthRepository: Repository<growing_from_strength>,

    @InjectRepository(water_section)
    private readonly water_sectionRepository: Repository<water_section>,

    @InjectRepository(Milestone)
    private readonly MilestoneRepository: Repository<Milestone>,

  ) {}

  async getHomeData() {
    const advertisements = await this.AdvertisementRepo.find({});
    const slides = await this.home_slidesRepo.find({
    });
    const mini_stats = await this.mini_statsRepo.find({});

    const parsedAdvertisementData = advertisements.map(item => {
        let parsedBoxData = item.box_data;
        
        if (item.box_data && typeof item.box_data === 'string') {
          try {
            parsedBoxData = JSON.parse(item.box_data);
          } catch (e) {
            console.error('Failed to parse box_data:', e);
          }
        }
        
        return {
          id: item.id,
          title: item.title,
          sub_title: item.sub_title,
          box_data: parsedBoxData, 
          image_title: item.image_title,
          image1: item.image1,
          image2: item.image2,
          image3: item.image3,
        };
    });
    const Overview = await this.OverviewSectionRepo.find({
    });
    const headings = await this.headingsRepository.findOne({
      where: { section_type: 'ecl_products' }
    });
    const products = await this.ecl_productsRepository.find({
      order: { id: 'ASC' } 
    });
    const formattedResponse = {
      title: headings?.title || '',
      sub_title: headings?.sub_title || '',
      description: headings?.description || '',
      products: products.map(product => ({
        id: product.id,
        label: product.label,
        sublabel: product.sublabel,
        icon: product.icon,
        title: product.title,
        description: product.description,
        properties: product.properties === 'true',
        image: product.image,
        btnLink: product.btnLink
      }))
    };
    const growing_from_strength = await this.growing_from_strengthRepository.find({});
    const growing_from_strengthData = growing_from_strength.map(item => {
        let parsedBoxData = item.box_data;
        
        if (item.box_data && typeof item.box_data === 'string') {
          try {
            parsedBoxData = JSON.parse(item.box_data);
          } catch (e) {
            console.error('Failed to parse box_data:', e);
          }
        }
        
        return {
          id: item.id,
          title: item.title,
          sub_title: item.sub_title,
          box_data: parsedBoxData, 
          image: item.image,
          video: item.video,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
    });
    const water_section = await this.water_sectionRepository.find({});

    const milestoneheadingRecord = await this.headingsRepository.findOne({
      where: { section_type: 'milestones' },
    });
    
    if (!milestoneheadingRecord) {
      return {
        status: true,
        statusCode: 200,
        message: 'No milestones found.',
        data: null,
      };
    }
    
    const milestones = await this.MilestoneRepository.find({
    });
    
    return {
      statusCode: 200,
      message: "Home data fetched successfully",
      data: {
        slides,
        advertisements: parsedAdvertisementData,
        mini_stats: mini_stats,
        overview_section: Overview,
        ecl_products: formattedResponse,
        growing_from_strength: growing_from_strengthData,
        water_section: water_section,
        milestones: {
        id: milestoneheadingRecord.id,
        title: milestoneheadingRecord.title,
        sub_title: milestoneheadingRecord.sub_title,
        description: milestoneheadingRecord.description,
        section_type: milestoneheadingRecord.section_type,
        milestones_data: milestones,
      },
      },
    }
  }
}
