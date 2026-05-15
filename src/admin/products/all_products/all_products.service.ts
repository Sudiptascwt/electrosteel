// // AllProducts.service.ts
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { AllProducts } from '../../../entity/all_products.entity';
// import { AllProductsDto } from '../../../dto/all_products.dto';

// @Injectable()
// export class AllProductsService {
//   constructor(
//     @InjectRepository(AllProducts)
//     private readonly AllProductsRepo: Repository<AllProducts>,
//   ) {}

//   // async create(createDto: AllProductsDto): Promise<AllProducts> {
//   //     const dataToSave = { ...createDto };

//   //     if (dataToSave.slider_images && Array.isArray(dataToSave.slider_images)) {
//   //         dataToSave.slider_images = JSON.stringify(dataToSave.slider_images);
//   //     }
      
//   //     const unit = this.AllProductsRepo.create(dataToSave);
//   //     return await this.AllProductsRepo.save(unit);
//   // }

//   async create(createDto: AllProductsDto): Promise<any> {
//   const dataToSave: any = { ...createDto };

//   if (!dataToSave.category) {
//     throw new Error('Category is required');
//   }

//   if (
//     dataToSave.slider_images &&
//     Array.isArray(dataToSave.slider_images)
//   ) {
//     dataToSave.slider_images = JSON.stringify(dataToSave.slider_images);
//   }

//   const formattedCategory = dataToSave.category
//     .replace(/\s+/g, '')
//     .toLowerCase();

//   const existingProduct = await this.AllProductsRepo
//     .createQueryBuilder('product')
//     .where(
//       `LOWER(REPLACE(product.category, ' ', '')) = :category`,
//       { category: formattedCategory },
//     )
//     .getOne();

//   if (existingProduct) {
//     Object.assign(existingProduct, dataToSave);
//     const updated = await this.AllProductsRepo.save(existingProduct);

//     return {
//       isUpdated: true,
//       product: updated,
//     };
//   }

//   const newProduct = this.AllProductsRepo.create(dataToSave);
//   const created = await this.AllProductsRepo.save(newProduct);

//   return {
//     isUpdated: false,
//     product: created,
//   };
//   }

//   async findAll(): Promise<AllProducts[]> {
//     const AllProducts = await this.AllProductsRepo.find({
//       order: { id: 'DESC' }
//     });
    
//     return AllProducts.map(blog => {
//       if (blog.slider_images && typeof blog.slider_images === 'string') {
//         try {
//           blog.slider_images = JSON.parse(blog.slider_images);
//         } catch (e) {
//         }
//       }
//       return blog;
//     });
//   }

//   async findById(id: number): Promise<AllProducts> {
//     const unit = await this.AllProductsRepo.findOne({ where: { id } });
//     if (!unit) throw new NotFoundException('Product not found');
    

//     if (unit.slider_images && typeof unit.slider_images === 'string') {
//       try {
//         unit.slider_images = JSON.parse(unit.slider_images);
//       } catch (e) {
//       }
//     }
    
//     return unit;
//   }

//   // async update(id: number, updateDto: AllProductsDto): Promise<AllProducts> {
//   //   const unit = await this.findById(id);

//   //   const dataToUpdate = { ...updateDto };
//   //   if (dataToUpdate.slider_images && Array.isArray(dataToUpdate.slider_images)) {
//   //     dataToUpdate.slider_images = JSON.stringify(dataToUpdate.slider_images);
//   //   }
    
//   //   Object.assign(unit, dataToUpdate);
//   //   return await this.AllProductsRepo.save(unit);
//   // }

//   async update(id: number, updateDto: AllProductsDto): Promise<AllProducts> {
//   const unit = await this.findById(id);

//   const dataToUpdate = { ...updateDto };
  
//   // Helper function to safely stringify
//   const safeStringify = (value: any): any => {
//     if (value === null || value === undefined) return value;
//     if (Array.isArray(value) || typeof value === 'object') {
//       return JSON.stringify(value);
//     }
//     return value;
//   };
  
//   // Handle all fields that might be arrays/objects
//   dataToUpdate.slider_images = safeStringify(dataToUpdate.slider_images);
//   dataToUpdate.table_headers = safeStringify(dataToUpdate.table_headers);
//   dataToUpdate.table_data = safeStringify(dataToUpdate.table_data);
//   // dataToUpdate.list_data = safeStringify(dataToUpdate.list_data);
//   // dataToUpdate.systems = safeStringify(dataToUpdate.systems);
//   // dataToUpdate.properties = safeStringify(dataToUpdate.properties);
  
//   Object.assign(unit, dataToUpdate);
//   return await this.AllProductsRepo.save(unit);
// }

//   async delete(id: number): Promise<void> {
//     const result = await this.AllProductsRepo.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException('Product not found');
//     }
//   }

//   async deleteByCategory(category: string) {
//     const result = await this.AllProductsRepo.delete({ category });
    
//     if (result.affected === 0) {
//       throw new Error(`No products found with category: ${category}`);
//     }
    
//     return result;
//   }
  
//   async findBlogByName(category: string): Promise<AllProducts[]> {
//     const formatted = category.replace(/\s+/g, '').toLowerCase(); 

//     const units = await this.AllProductsRepo
//       .createQueryBuilder('blog')
//       .where(`
//         LOWER(REPLACE(blog.category, ' ', '')) = :category
//       `, { category: formatted })
//       .getMany();  

//     if (!units || units.length === 0) {
//       throw new NotFoundException('Productsnot found');
//     }

//     return units.map(unit => {
//       if (unit.slider_images && typeof unit.slider_images === 'string') {
//         try {
//           unit.slider_images = JSON.parse(unit.slider_images);
//         } catch (e) {}
//       }
//       return unit;
//     });
//   }

// // Service
//   async findProductsByCategory(category: string, exact?: string): Promise<AllProducts[]> {
//       const formattedCategory = category.replace(/\s+/g, '').toLowerCase();
      
//       let data: AllProducts[];
      
//       if (exact === 'true') {
//           // Exact match
//           data = await this.AllProductsRepo
//               .createQueryBuilder('product')
//               .where(`LOWER(REPLACE(product.category, ' ', '')) = :category`, { 
//                   category: formattedCategory 
//               })
//               .getMany();
//       } else {
//           // Pattern match
//           data = await this.AllProductsRepo
//               .createQueryBuilder('product')
//               .where(`LOWER(REPLACE(product.category, ' ', '')) LIKE :category`, { 
//                   category: `${formattedCategory}%` 
//               })
//               .getMany();
//       }
      
//       if (!data || data.length === 0) {
//           throw new NotFoundException(`No products found for category: ${category}`);
//       }
      
//       // Parse JSON fields
//       return data.map(item => {
//           if (item.slider_images && typeof item.slider_images === 'string') {
//               try {
//                   item.slider_images = JSON.parse(item.slider_images);
//               } catch (e) {}
//           }
//           return item;
//       });
//   }
  
// }

// function slugify(title: string, arg1: {
//   lower: boolean; // Convert to lowercase
//   strict: boolean; // Remove special characters
//   locale: string; // Language locale
//   trim: boolean; // Trim leading/trailing spaces
// }): string {
//   throw new Error('Function not implemented.');
// }


// all_products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { AllProducts } from '../../../entity/all_products.entity';
import { AllProductsDto } from '../../../dto/all_products.dto';

@Injectable()
export class AllProductsService {
  constructor(
    @InjectRepository(AllProducts)
    private AllProductsRepo: Repository<AllProducts>,
  ) {}

  // Helper: Stringify objects/arrays for database
  private stringifyIfNeeded(value: any): string | null {
    if (value === null || value === undefined) return null;
    if (typeof value === 'string') return value;
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }

  // Helper: Parse JSON strings back to objects
  private parseJsonFields(product: any): any {
    if (!product) return product;
    
    const parsed = { ...product };
    
    const jsonFields = ['slider_images', 'table_headers', 'table_data', 'table_data2'];
    
    for (const field of jsonFields) {
      if (parsed[field] && typeof parsed[field] === 'string') {
        try {
          parsed[field] = JSON.parse(parsed[field]);
        } catch (e) {
          // Keep as string if parsing fails
        }
      }
    }
    
    return parsed;
  }

  async create(createDto: AllProductsDto): Promise<any> {
    const createData: any = {};
    
    if (!createDto.category) {
      throw new Error('Category is required');
    }
    
    createData.category = createDto.category;
    if (createDto.title !== undefined) createData.title = createDto.title;
    if (createDto.description !== undefined) createData.description = createDto.description;
    if (createDto.image !== undefined) createData.image = createDto.image;
    if (createDto.url !== undefined) createData.url = createDto.url;
    if (createDto.download_link !== undefined) createData.download_link = createDto.download_link;
    if (createDto.video_link !== undefined) createData.video_link = createDto.video_link;
    
    // Handle JSON fields
    if (createDto.slider_images !== undefined) {
      createData.slider_images = this.stringifyIfNeeded(createDto.slider_images);
    }
    if (createDto.table_headers !== undefined) {
      createData.table_headers = this.stringifyIfNeeded(createDto.table_headers);
    }
    if (createDto.table_data !== undefined) {
      createData.table_data = this.stringifyIfNeeded(createDto.table_data);
    }
    if (createDto.table_data2 !== undefined) {
      createData.table_data2 = this.stringifyIfNeeded(createDto.table_data2);
    }
    
    // Check if product exists by category
    const formattedCategory = createData.category.replace(/\s+/g, '').toLowerCase();
    
    const existingProduct = await this.AllProductsRepo
      .createQueryBuilder('product')
      .where(`LOWER(REPLACE(product.category, ' ', '')) = :category`, { category: formattedCategory })
      .getOne();
    
    if (existingProduct) {
      Object.assign(existingProduct, createData);
      const updated = await this.AllProductsRepo.save(existingProduct);
      return this.parseJsonFields(updated);
    }
    
    const newProduct = this.AllProductsRepo.create(createData);
    const created = await this.AllProductsRepo.save(newProduct);
    return this.parseJsonFields(created);
  }

  async findAll(): Promise<any[]> {
    const products = await this.AllProductsRepo.find({
      order: { id: 'DESC' }
    });
    return products.map(p => this.parseJsonFields(p));
  }

  async findById(id: number): Promise<any> {
    const product = await this.AllProductsRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return this.parseJsonFields(product);
  }

  async update(id: number, updateDto: AllProductsDto): Promise<any> {
    const product = await this.findById(id);
    
    const updateData: any = {};
    
    if (updateDto.category !== undefined) updateData.category = updateDto.category;
    if (updateDto.title !== undefined) updateData.title = updateDto.title;
    if (updateDto.description !== undefined) updateData.description = updateDto.description;
    if (updateDto.image !== undefined) updateData.image = updateDto.image;
    if (updateDto.url !== undefined) updateData.url = updateDto.url;
    if (updateDto.download_link !== undefined) updateData.download_link = updateDto.download_link;
    if (updateDto.video_link !== undefined) updateData.video_link = updateDto.video_link;
    
    // Handle JSON fields
    if (updateDto.slider_images !== undefined) {
      updateData.slider_images = this.stringifyIfNeeded(updateDto.slider_images);
    }
    if (updateDto.table_headers !== undefined) {
      updateData.table_headers = this.stringifyIfNeeded(updateDto.table_headers);
    }
    if (updateDto.table_data !== undefined) {
      updateData.table_data = this.stringifyIfNeeded(updateDto.table_data);
    }
    if (updateDto.table_data2 !== undefined) {
      updateData.table_data2 = this.stringifyIfNeeded(updateDto.table_data2);
    }
    
    Object.assign(product, updateData);
    const saved = await this.AllProductsRepo.save(product);
    return this.parseJsonFields(saved);
  }

  async delete(id: number): Promise<void> {
    const result = await this.AllProductsRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async deleteByCategory(category: string): Promise<void> {
    const result = await this.AllProductsRepo.delete({ category });
    if (result.affected === 0) {
      throw new NotFoundException(`Product with category "${category}" not found`);
    }
  }

  async findProductsByCategory(category: string, exact?: string): Promise<any[]> {
    let products;
    
    if (exact === 'true') {
      products = await this.AllProductsRepo.find({ where: { category } });
    } else {
      products = await this.AllProductsRepo.find({ 
        where: { category: Like(`%${category}%`) } 
      });
    }
    
    return products.map(p => this.parseJsonFields(p));
  }

  async findBlogByName(category: string): Promise<any[]> {
    const products = await this.AllProductsRepo.find({ 
      where: { category: Like(`%${category}%`) } 
    });
    return products.map(p => this.parseJsonFields(p));
  }
}