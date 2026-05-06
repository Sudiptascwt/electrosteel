// services/people_data.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionContent } from '../../../entity/section_contents.entity';
import { CardContent } from '../../../entity/card_contents.entity';
import { Testimonial } from '../../../entity/testimonials.entity';
import { Reward } from '../../../entity/rewards.entity';
import { Blogs } from 'src/entity/blogs.entity';

@Injectable()
export class peopleDataService {
  constructor(
    @InjectRepository(SectionContent)
    private sectionRepo: Repository<SectionContent>,
    @InjectRepository(Testimonial)
    private testimonialRepo: Repository<Testimonial>,
    @InjectRepository(Reward)
    private rewardRepo: Repository<Reward>,
    @InjectRepository(Blogs)
    private BlogsRepo: Repository<Blogs>,
  ) {}

  // ==================== SECTION CONTENT ====================
  
  async getSectionContent() {
    const content = await this.sectionRepo.find({ take: 1 });
    
    const data = content.length > 0 ? content[0] : null;
    let responseData = null;
    
    if (data) {
      responseData = {
        id: data.id,
        title: data.title,
        description: data.description,
        created_at: data.created_at,
        updated_at: data.updated_at,
        image1: null,
        image2: null
      };
      
      // Parse image1 if it's a JSON string
      if (data.image1 && typeof data.image1 === 'string') {
        try {
          responseData.image1 = JSON.parse(data.image1);
        } catch (e) {
          responseData.image1 = data.image1;
        }
      } else {
        responseData.image1 = data.image1;
      }
      
      // Parse image2 if it's a JSON string
      if (data.image2 && typeof data.image2 === 'string') {
        try {
          responseData.image2 = JSON.parse(data.image2);
        } catch (e) {
          responseData.image2 = data.image2;
        }
      } else {
        responseData.image2 = data.image2;
      }
    }
    
    return {
      success: true,
      data: responseData
    };
  }

  async upsertSectionContent(data: any) {
    const existing = await this.sectionRepo.find({ take: 1 });
    
    // Prepare data for database
    const dbData: any = {
      title: data.title,
      description: data.description
    };
    
    // Handle image1 - convert object to JSON string
    if (data.image1 !== undefined) {
      if (typeof data.image1 === 'object') {
        dbData.image1 = JSON.stringify(data.image1);
      } else {
        dbData.image1 = data.image1;
      }
    }
    
    // Handle image2 - convert object to JSON string
    if (data.image2 !== undefined) {
      if (typeof data.image2 === 'object') {
        dbData.image2 = JSON.stringify(data.image2);
      } else {
        dbData.image2 = data.image2;
      }
    }
    
    let content;
    
    if (existing.length > 0) {
      // Update existing record
      await this.sectionRepo.update(existing[0].id, dbData);
      content = await this.sectionRepo.findOne({ where: { id: existing[0].id } });
    } else {
      // Create new record
      content = await this.sectionRepo.save(dbData);
    }
    
    // Parse back for response
    let responseData = null;
    if (content) {
      responseData = {
        id: content.id,
        title: content.title,
        description: content.description,
        created_at: content.created_at,
        updated_at: content.updated_at,
        image1: null,
        image2: null
      };
      
      // Parse image1
      if (content.image1 && typeof content.image1 === 'string') {
        try {
          responseData.image1 = JSON.parse(content.image1);
        } catch (e) {
          responseData.image1 = content.image1;
        }
      } else {
        responseData.image1 = content.image1;
      }
      
      // Parse image2
      if (content.image2 && typeof content.image2 === 'string') {
        try {
          responseData.image2 = JSON.parse(content.image2);
        } catch (e) {
          responseData.image2 = content.image2;
        }
      } else {
        responseData.image2 = content.image2;
      }
    }
    
    return {
      success: true,
      message: `Section content ${existing.length > 0 ? 'updated' : 'created'} successfully`,
      data: responseData
    };
  }

  // ==================== TESTIMONIALS ====================
  
  async getTestimonials() {
    const content = await this.testimonialRepo.find({ take: 1 });
    
    const data = content.length > 0 ? content[0] : null;
    let responseData = null;
    
    if (data) {
      responseData = {
        id: data.id,
        title: data.title,
        description: data.description,
        created_at: data.created_at,
        updated_at: data.updated_at,
        image1: null,
        image2: null
      };
      
      // Parse image1 if it's a JSON string
      if (data.image1 && typeof data.image1 === 'string') {
        try {
          responseData.image1 = JSON.parse(data.image1);
        } catch (e) {
          responseData.image1 = data.image1;
        }
      } else {
        responseData.image1 = data.image1;
      }
      
      // Parse image2 if it's a JSON string
      if (data.image2 && typeof data.image2 === 'string') {
        try {
          responseData.image2 = JSON.parse(data.image2);
        } catch (e) {
          responseData.image2 = data.image2;
        }
      } else {
        responseData.image2 = data.image2;
      }
    }
    
    return {
      success: true,
      data: responseData
    };
  }

  async upsertTestimonials(data: any) {
    const existing = await this.testimonialRepo.find({ take: 1 });
    
    // Prepare data for database
    const dbData: any = {
      title: data.title,
      description: data.description
    };
    
    // Handle image1 - convert object to JSON string
    if (data.image1 !== undefined) {
      if (typeof data.image1 === 'object') {
        dbData.image1 = JSON.stringify(data.image1);
      } else {
        dbData.image1 = data.image1;
      }
    }
    
    // Handle image2 - convert object to JSON string
    if (data.image2 !== undefined) {
      if (typeof data.image2 === 'object') {
        dbData.image2 = JSON.stringify(data.image2);
      } else {
        dbData.image2 = data.image2;
      }
    }
    
    let content;
    
    if (existing.length > 0) {
      // Update existing record
      await this.testimonialRepo.update(existing[0].id, dbData);
      content = await this.testimonialRepo.findOne({ where: { id: existing[0].id } });
    } else {
      // Create new record
      content = await this.testimonialRepo.save(dbData);
    }
    
    // Parse back for response
    let responseData = null;
    if (content) {
      responseData = {
        id: content.id,
        title: content.title,
        description: content.description,
        created_at: content.created_at,
        updated_at: content.updated_at,
        image1: null,
        image2: null
      };
      
      // Parse image1
      if (content.image1 && typeof content.image1 === 'string') {
        try {
          responseData.image1 = JSON.parse(content.image1);
        } catch (e) {
          responseData.image1 = content.image1;
        }
      } else {
        responseData.image1 = content.image1;
      }
      
      // Parse image2
      if (content.image2 && typeof content.image2 === 'string') {
        try {
          responseData.image2 = JSON.parse(content.image2);
        } catch (e) {
          responseData.image2 = content.image2;
        }
      } else {
        responseData.image2 = content.image2;
      }
    }
    
    return {
      success: true,
      message: `Testimonial ${existing.length > 0 ? 'updated' : 'created'} successfully`,
      data: responseData
    };
  }

  // ==================== REWARDS ====================
  
  // services/people_data.service.ts
  async getRewards() {
    const reward = await this.rewardRepo.find({ take: 1 });
    
    const data = reward.length > 0 ? reward[0] : null;
    let responseData = null;
    
    if (data) {
      responseData = {
        id: data.id,
        title: data.title,
        created_at: data.created_at,
        updated_at: data.updated_at,
        pragatiData: null,
        pratihbaImages: null
      };

      if (data.pragatiData && typeof data.pragatiData === 'string') {
        try {
          responseData.pragatiData = JSON.parse(data.pragatiData);
        } catch (e) {
          responseData.pragatiData = null;
        }
      }
      
      // Parse pratihbaImages (object with title and images array)
      if (data.pratihbaImages && typeof data.pratihbaImages === 'string') {
        try {
          responseData.pratihbaImages = JSON.parse(data.pratihbaImages);
        } catch (e) {
          responseData.pratihbaImages = null;
        }
      }
    }
    
    return { 
      success: true, 
      data: responseData
    };
  }

  async upsertRewards(data: any) {
    const existing = await this.rewardRepo.find({ take: 1 });
    
    // Prepare data for database (convert objects to JSON strings)
    const dbData: any = {
      title: data.title
    };
    
    // Handle pragatiData - convert object to JSON string
    if (data.pragatiData !== undefined) {
      if (typeof data.pragatiData === 'object') {
        dbData.pragatiData = JSON.stringify(data.pragatiData);
      } else {
        dbData.pragatiData = data.pragatiData;
      }
    }
    
    // Handle pratihbaImages - convert object to JSON string
    if (data.pratihbaImages !== undefined) {
      if (typeof data.pratihbaImages === 'object') {
        dbData.pratihbaImages = JSON.stringify(data.pratihbaImages);
      } else {
        dbData.pratihbaImages = data.pratihbaImages;
      }
    }
    
    let reward;
    
    if (existing.length > 0) {
      // Update existing record
      await this.rewardRepo.update(existing[0].id, dbData);
      reward = await this.rewardRepo.findOne({ where: { id: existing[0].id } });
    } else {
      // Create new record
      reward = await this.rewardRepo.save(dbData);
    }
    
    // Parse back to objects for response
    let responseData = null;
    if (reward) {
      responseData = {
        id: reward.id,
        title: reward.title,
        created_at: reward.created_at,
        updated_at: reward.updated_at,
        pragatiData: null,
        pratihbaImages: null
      };
      
      if (reward.pragatiData && typeof reward.pragatiData === 'string') {
        try {
          responseData.pragatiData = JSON.parse(reward.pragatiData);
        } catch (e) {
          responseData.pragatiData = null;
        }
      }
      
      if (reward.pratihbaImages && typeof reward.pratihbaImages === 'string') {
        try {
          responseData.pratihbaImages = JSON.parse(reward.pratihbaImages);
        } catch (e) {
          responseData.pratihbaImages = null;
        }
      }
    }
    
    return {
      success: true,
      message: `Reward ${existing.length > 0 ? 'updated' : 'created'} successfully`,
      data: responseData
    };
  }

  async upsertPeopleContent(data: any) {
    // Find existing record by static category
    const existing = await this.BlogsRepo.find({ 
      where: { category: 'people_data_content' } 
    });
    
    let content;
    
    // Prepare data with static category
    const saveData = {
      category: 'people_data_content',  // Static category
      ...data  // Spread the rest of the data from request
    };
    
    if (existing.length > 0) {
      // Update existing record
      await this.BlogsRepo.update(existing[0].id, saveData);
      content = await this.BlogsRepo.findOne({ where: { id: existing[0].id } });
    } else {
      // Create new record
      content = await this.BlogsRepo.save(saveData);
    }
    
    return {
      success: true,
      message: `Content ${existing.length > 0 ? 'updated' : 'created'} successfully`,
      data: content
    };
  }

  // ==================== TESTIMONIALS ====================
  
  async getPeopleContent() {
    const testimonial = await this.BlogsRepo.find({where: { category: 'people_data_content' }});
    return { 
      success: true, 
      data: testimonial.length > 0 ? testimonial[0] : null
    };
  }
}