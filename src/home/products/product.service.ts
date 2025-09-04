import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { ProductDto } from '../../dto/product.dto';
import { Product } from '../../entity/product.entity';

@Injectable()
export class ProductService {
    constructor(
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>, 
  ) {}
  async createProduct(data: ProductDto): Promise<{ statusCode: number; message: string; data: Product }> {
    const product = this.ProductRepository.create(data);
    const saved = await this.ProductRepository.save(product);

    return {
      statusCode: 201,
      message: 'Product created successfully',
      data: saved,
    };
  }

  // Update product
  async updateProduct(id: number, data: Partial<ProductDto>): Promise<{ statusCode: number; message: string; data: Product }> {
    const product = await this.ProductRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    Object.assign(product, data); // merge partial fields
    const saved = await this.ProductRepository.save(product);

    return {
      statusCode: 200,
      message: 'Product updated successfully',
      data: saved,
    };
  }
  // GET SINGLE Product
  async getProductById(id: number) {
    const Product = await this.ProductRepository.findOne({ where: { id } });

    if (!Product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return {
      statusCode: 200,
      message: 'Product fetched successfully.',
      data: Product,
    };
  }

  // GET ALL ProductS
  async getAllProducts() {
    const Products = await this.ProductRepository.find({
      order: { created_at: 'DESC' },
    });

    return {
      statusCode: 200,
      message: 'Products fetched successfully.',
      data: Products,
    };
  }

  async deleteProduct(id: number) {
  const result = await this.ProductRepository.delete(id);
  if (result.affected == 0) throw new NotFoundException(`Product with ID ${id} not found`);

  return {
    statusCode: 200,
    message: 'Product deleted successfully',
  };
  }
}