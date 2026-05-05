// services/people_data.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionContent } from '../../../entity/section_contents.entity';
import { CardContent } from '../../../entity/card_contents.entity';
import { Testimonial } from '../../../entity/testimonials.entity';
import { Reward } from '../../../entity/rewards.entity';

@Injectable()
export class peopleDataService {
  constructor(
    @InjectRepository(SectionContent)
    private sectionRepo: Repository<SectionContent>,
    @InjectRepository(CardContent)
    private cardRepo: Repository<CardContent>,
    @InjectRepository(Testimonial)
    private testimonialRepo: Repository<Testimonial>,
    @InjectRepository(Reward)
    private rewardRepo: Repository<Reward>,
  ) {}

  // ==================== SECTION CONTENT (Single record) ====================
  
  async getSectionContent() {
    const content = await this.sectionRepo.find({ take: 1 });
    
    return {
      success: true,
      data: content.length > 0 ? content[0] : null
    };
  }

  async upsertSectionContent(data: any) {
    const existing = await this.sectionRepo.find({ take: 1 });
    
    let content;
    
    if (existing.length > 0) {
      // Update existing record
      await this.sectionRepo.update(existing[0].id, data);
      content = await this.sectionRepo.findOne({ where: { id: existing[0].id } });
    } else {
      // Create new record
      content = await this.sectionRepo.save(data);
    }
    
    return {
      success: true,
      message: `Section content ${existing.length > 0 ? 'updated' : 'created'} successfully`,
      data: content
    };
  }

  // ==================== CARDS (Single section, multiple cards) ====================
  
  async getCards() {
    const cards = await this.cardRepo.find({
      where: { is_active : true },
      order: { order: 'ASC' }
    });
    
    return { success: true, data: cards };
  }

  async upsertCards(data: any) {
    const { cards } = data;
    
    if (!cards || !Array.isArray(cards)) {
      return { success: false, message: 'cards array is required' };
    }
    
    // Delete all existing cards
    await this.cardRepo.clear();
    
    // Create new cards
    const newCards = [];
    for (const card of cards) {
      const newCard = await this.cardRepo.save(card);
      newCards.push(newCard);
    }
    
    return {
      success: true,
      message: `${newCards.length} cards saved successfully`,
      data: newCards
    };
  }

  // ==================== TESTIMONIALS ====================
  
  async getTestimonials() {
    const testimonials = await this.testimonialRepo.find({
      where: { is_active : true },
      order: { order: 'ASC' }
    });
    
    return { success: true, data: testimonials };
  }

  async upsertTestimonials(data: any) {
    const { testimonials } = data;
    
    if (!testimonials || !Array.isArray(testimonials)) {
      return { success: false, message: 'testimonials array is required' };
    }
    
    // Delete all existing testimonials
    await this.testimonialRepo.clear();
    
    // Create new testimonials
    const newTestimonials = [];
    for (const testimonial of testimonials) {
      const newTestimonial = await this.testimonialRepo.save(testimonial);
      newTestimonials.push(newTestimonial);
    }
    
    return {
      success: true,
      message: `${newTestimonials.length} testimonials saved successfully`,
      data: newTestimonials
    };
  }

  // ==================== REWARDS ====================
  
  async getRewards() {
    const rewards = await this.rewardRepo.find({
      where: { is_active : true },
      order: { order: 'ASC', awardedDate: 'DESC' }
    });
    
    // Group by category
    const grouped = rewards.reduce((acc, reward) => {
      if (!acc[reward.category]) acc[reward.category] = [];
      acc[reward.category].push(reward);
      return acc;
    }, {});
    
    return { success: true, data: grouped, all: rewards };
  }

  async upsertRewards(data: any) {
    const { rewards } = data;
    
    if (!rewards || !Array.isArray(rewards)) {
      return { success: false, message: 'rewards array is required' };
    }
    
    // Delete all existing rewards
    await this.rewardRepo.clear();
    
    // Create new rewards
    const newRewards = [];
    for (const reward of rewards) {
      const newReward = await this.rewardRepo.save(reward);
      newRewards.push(newReward);
    }
    
    return {
      success: true,
      message: `${newRewards.length} rewards saved successfully`,
      data: newRewards
    };
  }
}