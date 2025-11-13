import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from '../../dto/product.dto';
import { Product } from '../../entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  /**
   * Create new product
   */
  async createProduct(data: ProductDto) {
    const newProduct = this.productRepository.create(data);
    const savedProduct = await this.productRepository.save(newProduct);

    return {
      status: true,
      statusCode: 201,
      message: 'Product created successfully',
      data: savedProduct,
    };
  }

  /**
   * Update existing product
   */
  async updateProduct(id: number, data: Partial<ProductDto>) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      return {
        status: false,
        statusCode: 404,
        message: 'Product not found',
        data: [],
      };
    }

    Object.assign(product, data);
    const updatedProduct = await this.productRepository.save(product);

    return {
      status: true,
      statusCode: 200,
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  /**
   * Get single product by ID
   */
  async getProductById(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      return {
        status: false,
        statusCode: 404,
        message: `Product with ID ${id} not found`,
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Product fetched successfully',
      data: [product],
    };
  }

  /**
   * Get all products
   */
  async getAllProducts() {
    const products = await this.productRepository.find({
      order: { created_at: 'DESC' },
    });

    return {
      status: true,
      statusCode: 200,
      message: products.length
        ? 'Products fetched successfully'
        : 'No products found',
      data: products,
    };
  }

  /**
   * Delete product by ID
   */
  async deleteProduct(id: number) {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      return {
        status: false,
        statusCode: 404,
        message: `Product with ID ${id} not found`,
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Product deleted successfully',
      data: [],
    };
  }
}
