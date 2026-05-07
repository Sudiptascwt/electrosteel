// blogs.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blogs } from 'src/entity/blogs.entity';
import { BlogsDto } from '../../dto/blogs.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blogs)
    private readonly BlogsRepo: Repository<Blogs>,
  ) {}

  // async create(createDto: BlogsDto): Promise<Blogs> {
  //   // Convert images array to JSON string if it's an array
  //   const dataToSave = { ...createDto };
  //   if (dataToSave.images && Array.isArray(dataToSave.images)) {
  //     dataToSave.images = JSON.stringify(dataToSave.images);
  //   }

  //   if (dataToSave.slider_image && Array.isArray(dataToSave.slider_image)) {
  //     dataToSave.slider_image = JSON.stringify(dataToSave.slider_image);
  //   }
    
  //   const unit = this.BlogsRepo.create(dataToSave);
  //   return await this.BlogsRepo.save(unit);
  // }

  async create(createDto: BlogsDto): Promise<Blogs> {
      const dataToSave = { ...createDto };
      
      // Generate slug from title if slug is not provided
      if (createDto.title && !createDto.slug) {
          dataToSave.slug = await this.generateUniqueSlug(createDto.title);
      }
      
      if (dataToSave.images && Array.isArray(dataToSave.images)) {
          dataToSave.images = JSON.stringify(dataToSave.images);
      }

      if (dataToSave.slider_image && Array.isArray(dataToSave.slider_image)) {
          dataToSave.slider_image = JSON.stringify(dataToSave.slider_image);
      }
      
      const unit = this.BlogsRepo.create(dataToSave);
      return await this.BlogsRepo.save(unit);
  }
  
  private async generateUniqueSlug(title: string): Promise<string> {
      const baseSlug = this.createSlug(title);
      let slug = baseSlug;
      let counter = 1;
      
      // Check if slug already exists
      while (await this.BlogsRepo.findOne({ where: { slug } })) {
          slug = `${baseSlug}-${counter}`;
          counter++;
      }
      
      return slug;
  }

  private createSlug(text: string): string {
      return text
          .toString()
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '');
  }

  async findAll(): Promise<Blogs[]> {
    const blogs = await this.BlogsRepo.find({
      order: { id: 'DESC' }
    });
    
    // Parse images back to array for response
    return blogs.map(blog => {
      if (blog.images && typeof blog.images === 'string') {
        try {
          blog.images = JSON.parse(blog.images);
        } catch (e) {
          // Keep as string if parsing fails
        }
      }
      if (blog.slider_image && typeof blog.slider_image === 'string') {
        try {
          blog.slider_image = JSON.parse(blog.slider_image);
        } catch (e) {
          // Keep as string if parsing fails
        }
      }
      return blog;
    });
  }

  async findById(id: number): Promise<Blogs> {
    const unit = await this.BlogsRepo.findOne({ where: { id } });
    if (!unit) throw new NotFoundException('Blogs not found');
    
    // Parse images back to array for response
    if (unit.images && typeof unit.images === 'string') {
      try {
        unit.images = JSON.parse(unit.images);
      } catch (e) {
        // Keep as string if parsing fails
      }
    }

    if (unit.slider_image && typeof unit.slider_image === 'string') {
      try {
        unit.slider_image = JSON.parse(unit.slider_image);
      } catch (e) {
        // Keep as string if parsing fails
      }
    }
    
    return unit;
  }

  async update(id: number, updateDto: BlogsDto): Promise<Blogs> {
    const unit = await this.findById(id);
    
    // Convert images array to JSON string if it's an array
    const dataToUpdate = { ...updateDto };
    if (dataToUpdate.images && Array.isArray(dataToUpdate.images)) {
      dataToUpdate.images = JSON.stringify(dataToUpdate.images);
    }
    if (dataToUpdate.slider_image && Array.isArray(dataToUpdate.slider_image)) {
      dataToUpdate.slider_image = JSON.stringify(dataToUpdate.slider_image);
    }
    
    Object.assign(unit, dataToUpdate);
    return await this.BlogsRepo.save(unit);
  }

  async delete(id: number): Promise<void> {
    const result = await this.BlogsRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Blogs not found');
    }
  }
  
  async findBlogByName(category: string): Promise<Blogs[]> {
    const formatted = category.replace(/\s+/g, '').toLowerCase(); 

    const units = await this.BlogsRepo
      .createQueryBuilder('blog')
      .where(`
        LOWER(REPLACE(blog.category, ' ', '')) = :category
      `, { category: formatted })
      .getMany();  // ✅ Returns array of blogs

    if (!units || units.length === 0) {
      throw new NotFoundException('Blogs not found');
    }
    
    // Parse images back to array for each blog
    return units.map(unit => {
      if (unit.images && typeof unit.images === 'string') {
        try {
          unit.images = JSON.parse(unit.images);
        } catch (e) {}
      }
      if (unit.slider_image && typeof unit.slider_image === 'string') {
        try {
          unit.slider_image = JSON.parse(unit.slider_image);
        } catch (e) {}
      }
      return unit;
    });
  }
}

function slugify(title: string, arg1: {
  lower: boolean; // Convert to lowercase
  strict: boolean; // Remove special characters
  locale: string; // Language locale
  trim: boolean; // Trim leading/trailing spaces
}): string {
  throw new Error('Function not implemented.');
}
