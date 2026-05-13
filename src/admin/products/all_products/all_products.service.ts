// AllProducts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllProducts } from '../../../entity/all_products.entity';
import { AllProductsDto } from '../../../dto/all_products.dto';

@Injectable()
export class AllProductsService {
  constructor(
    @InjectRepository(AllProducts)
    private readonly AllProductsRepo: Repository<AllProducts>,
  ) {}

  // async create(createDto: AllProductsDto): Promise<AllProducts> {
  //     const dataToSave = { ...createDto };

  //     if (dataToSave.slider_images && Array.isArray(dataToSave.slider_images)) {
  //         dataToSave.slider_images = JSON.stringify(dataToSave.slider_images);
  //     }
      
  //     const unit = this.AllProductsRepo.create(dataToSave);
  //     return await this.AllProductsRepo.save(unit);
  // }

  async create(createDto: AllProductsDto): Promise<any> {
  const dataToSave: any = { ...createDto };

  if (!dataToSave.category) {
    throw new Error('Category is required');
  }

  if (
    dataToSave.slider_images &&
    Array.isArray(dataToSave.slider_images)
  ) {
    dataToSave.slider_images = JSON.stringify(dataToSave.slider_images);
  }

  const formattedCategory = dataToSave.category
    .replace(/\s+/g, '')
    .toLowerCase();

  const existingProduct = await this.AllProductsRepo
    .createQueryBuilder('product')
    .where(
      `LOWER(REPLACE(product.category, ' ', '')) = :category`,
      { category: formattedCategory },
    )
    .getOne();

  if (existingProduct) {
    Object.assign(existingProduct, dataToSave);
    const updated = await this.AllProductsRepo.save(existingProduct);

    return {
      isUpdated: true,
      product: updated,
    };
  }

  const newProduct = this.AllProductsRepo.create(dataToSave);
  const created = await this.AllProductsRepo.save(newProduct);

  return {
    isUpdated: false,
    product: created,
  };
  }

  async findAll(): Promise<AllProducts[]> {
    const AllProducts = await this.AllProductsRepo.find({
      order: { id: 'DESC' }
    });
    
    return AllProducts.map(blog => {
      if (blog.slider_images && typeof blog.slider_images === 'string') {
        try {
          blog.slider_images = JSON.parse(blog.slider_images);
        } catch (e) {
        }
      }
      return blog;
    });
  }

  async findById(id: number): Promise<AllProducts> {
    const unit = await this.AllProductsRepo.findOne({ where: { id } });
    if (!unit) throw new NotFoundException('Product not found');
    

    if (unit.slider_images && typeof unit.slider_images === 'string') {
      try {
        unit.slider_images = JSON.parse(unit.slider_images);
      } catch (e) {
      }
    }
    
    return unit;
  }

  async update(id: number, updateDto: AllProductsDto): Promise<AllProducts> {
    const unit = await this.findById(id);

    const dataToUpdate = { ...updateDto };
    if (dataToUpdate.slider_images && Array.isArray(dataToUpdate.slider_images)) {
      dataToUpdate.slider_images = JSON.stringify(dataToUpdate.slider_images);
    }
    
    Object.assign(unit, dataToUpdate);
    return await this.AllProductsRepo.save(unit);
  }

  async delete(id: number): Promise<void> {
    const result = await this.AllProductsRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }
  
  async findBlogByName(category: string): Promise<AllProducts[]> {
    const formatted = category.replace(/\s+/g, '').toLowerCase(); 

    const units = await this.AllProductsRepo
      .createQueryBuilder('blog')
      .where(`
        LOWER(REPLACE(blog.category, ' ', '')) = :category
      `, { category: formatted })
      .getMany();  

    if (!units || units.length === 0) {
      throw new NotFoundException('Productsnot found');
    }

    return units.map(unit => {
      if (unit.slider_images && typeof unit.slider_images === 'string') {
        try {
          unit.slider_images = JSON.parse(unit.slider_images);
        } catch (e) {}
      }
      return unit;
    });
  }

// Service
  async findProductsByCategory(category: string, exact?: string): Promise<AllProducts[]> {
      const formattedCategory = category.replace(/\s+/g, '').toLowerCase();
      
      let data: AllProducts[];
      
      if (exact === 'true') {
          // Exact match
          data = await this.AllProductsRepo
              .createQueryBuilder('product')
              .where(`LOWER(REPLACE(product.category, ' ', '')) = :category`, { 
                  category: formattedCategory 
              })
              .getMany();
      } else {
          // Pattern match
          data = await this.AllProductsRepo
              .createQueryBuilder('product')
              .where(`LOWER(REPLACE(product.category, ' ', '')) LIKE :category`, { 
                  category: `${formattedCategory}%` 
              })
              .getMany();
      }
      
      if (!data || data.length === 0) {
          throw new NotFoundException(`No products found for category: ${category}`);
      }
      
      // Parse JSON fields
      return data.map(item => {
          if (item.slider_images && typeof item.slider_images === 'string') {
              try {
                  item.slider_images = JSON.parse(item.slider_images);
              } catch (e) {}
          }
          return item;
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
