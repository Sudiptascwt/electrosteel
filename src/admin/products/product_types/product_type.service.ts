import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductType } from '../../../entity/product_type.entity';
import { ProductTypeDto } from '../../../dto/product_type.dto';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductType)
    private readonly productAppRepo: Repository<ProductType>,

  ) {}

  // CREATE
  async create(createDto: ProductTypeDto) {
    const newApp = this.productAppRepo.create(createDto);
    const data = await this.productAppRepo.save(newApp);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product created successfully',
      data,
    };
  }

  // GET ALL
  async findAll() {
    const data = await this.productAppRepo.find({ order: { id: 'DESC' } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Product fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findById(id: number) {
    const app = await this.productAppRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Product application with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Product fetched successfully',
      data: app,
    };
  }

  // UPDATE
  async update(id: number, updateDto: ProductTypeDto) {
    const app = await this.productAppRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Product application with ID ${id} not found`);
    }

    Object.assign(app, updateDto);
    const data = await this.productAppRepo.save(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Product updated successfully',
      data,
    };
  }

  // DELETE
  async delete(id: number) {
    const app = await this.productAppRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Product application with ID ${id} not found`);
    }

    await this.productAppRepo.remove(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Product deleted successfully',
    };
  }
}
