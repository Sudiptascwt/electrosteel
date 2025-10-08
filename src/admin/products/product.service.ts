import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { product_applications } from '../../entity/product_application.entity';
import { ProductApplicationDto } from '../../dto/product_application.dto';
import { product_application_images } from '../../entity/product_application_images.entity';
import { ProductApplicationImageDto } from '../../dto/product_application_images.dto'

@Injectable()
export class ProductApplicationsService {
  constructor(
    @InjectRepository(product_applications)
    private readonly productAppRepo: Repository<product_applications>,

    @InjectRepository(product_application_images)
    private readonly productAppImgRepo: Repository<product_application_images>,
  ) {}

  // CREATE
  async create(createDto: ProductApplicationDto) {
    const newApp = this.productAppRepo.create(createDto);
    const data = await this.productAppRepo.save(newApp);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product application created successfully',
      data,
    };
  }

  // GET ALL
  async findAll() {
    const data = await this.productAppRepo.find({ order: { id: 'DESC' } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Product applications fetched successfully',
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
      message: 'Product application fetched successfully',
      data: app,
    };
  }

  // UPDATE
  async update(id: number, updateDto: ProductApplicationDto) {
    const app = await this.productAppRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Product application with ID ${id} not found`);
    }

    Object.assign(app, updateDto);
    const data = await this.productAppRepo.save(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Product application updated successfully',
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
      message: 'Product application deleted successfully',
    };
  }

  /////////////////////product image application part ////////////////////////////
  
  async createApplicationImage(createDto: ProductApplicationImageDto) {
    const newApp = this.productAppImgRepo.create(createDto);
    const data = await this.productAppImgRepo.save(newApp);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product application created successfully',
      data,
    };
  }

  async updateApplicationImage(id: number, updateDto: ProductApplicationImageDto) {
    const app = await this.productAppImgRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Product application with ID ${id} not found`);
    }

    Object.assign(app, updateDto);
    const data = await this.productAppImgRepo.save(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Product application updated successfully',
      data,
    };
  }

    // GET ALL
  async findAllApplicationImages() {
    const data = await this.productAppImgRepo.find({ order: { id: 'DESC' } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Product applications fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findApplicationImageById(id: number) {
    const app = await this.productAppImgRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Product application with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Product application image fetched successfully',
      data: app,
    };
  }
  async deleteApplicationImage(id: number) {
    const app = await this.productAppImgRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Product application with ID ${id} not found`);
    }

    await this.productAppImgRepo.remove(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Product application image deleted successfully',
    };
  }
}
