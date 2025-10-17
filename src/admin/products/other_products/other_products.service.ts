import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtherProducts } from 'src/entity/other_products.entity';
import { OtherProductsDto } from 'src/dto/other_products.dto';

@Injectable()
export class OtherProductsService {
  constructor(
    @InjectRepository(OtherProducts)
    private readonly DuctileIronFittingsOverviewRepo: Repository<OtherProducts>,
  ) {}

  // CREATE
  async createOtherProduct(createDto: OtherProductsDto) {
    const newApp = this.DuctileIronFittingsOverviewRepo.create(createDto);
    const data = await this.DuctileIronFittingsOverviewRepo.save(newApp);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Other product created successfully.',
      data,
    };
  }
  // GET ALL
  async findAllOtherProducts() {
    const data = await this.DuctileIronFittingsOverviewRepo.find({ order: { id: 'DESC' } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Other product fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findOtherProductById(id: number) {
    const app = await this.DuctileIronFittingsOverviewRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Other product with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Other product details fetched fetched successfully',
      data: app,
    };
  }

  // UPDATE
  async updateOtherProduct(id: number, updateDto: OtherProductsDto) {
    const app = await this.DuctileIronFittingsOverviewRepo.findOne({ where: { id } });
    if (!app)
       {
      throw new NotFoundException(`Other product with ID ${id} not found`);
    }

    Object.assign(app, updateDto);
    const data = await this.DuctileIronFittingsOverviewRepo.save(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Other product details updated successfully',
      data,
    };
  }

  // DELETE
  async deleteOtherProduct(id: number) {
    const app = await this.DuctileIronFittingsOverviewRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Other product with ID ${id} not found`);
    }

    await this.DuctileIronFittingsOverviewRepo.remove(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Other product deleted successfully',
    };
  }
}
