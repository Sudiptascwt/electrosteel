import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DuctileIronFittingsOverview } from 'src/entity/ductile_iron_fittings_overview.entity';
import { DuctileIronFittingsOverviewDto } from 'src/dto/ductile_iron_fittings_overview.dto';
import { DuctileIronFittingsDetails } from 'src/entity/ductile_iron_fittings_details.entity';
import { DuctileIronFittingsDetailsDto } from 'src/dto/ductile_iron_fittings_details.dto';

@Injectable()
export class ProductDuctileIronFittingsService {
  constructor(
    @InjectRepository(DuctileIronFittingsOverview)
    private readonly DuctileIronFittingsOverviewRepo: Repository<DuctileIronFittingsOverview>,
    @InjectRepository(DuctileIronFittingsDetails)
    private readonly DuctileIronFittingsDetailsRepo: Repository<DuctileIronFittingsDetails>
  ) {}

  // CREATE
  async createOverview(createDto: DuctileIronFittingsOverviewDto) {
    const newApp = this.DuctileIronFittingsOverviewRepo.create(createDto);
    const data = await this.DuctileIronFittingsOverviewRepo.save(newApp);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Ductile iron fittings overview created successfully.',
      data,
    };
  }
  // GET ALL
  async findAllOverviews() {
    const data = await this.DuctileIronFittingsOverviewRepo.find({ order: { id: 'DESC' } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings overview fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findOverviewById(id: number) {
    const app = await this.DuctileIronFittingsOverviewRepo.findOne({ where: { id } });
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
  async updateOverview(id: number, updateDto: DuctileIronFittingsOverviewDto) {
    const app = await this.DuctileIronFittingsOverviewRepo.findOne({ where: { id } });
    if (!app)
       {
      throw new NotFoundException(`Ductile iron fittings overview with ID ${id} not found`);
    }

    Object.assign(app, updateDto);
    const data = await this.DuctileIronFittingsOverviewRepo.save(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings overview updated successfully',
      data,
    };
  }

  // DELETE
  async deleteOverview(id: number) {
    const app = await this.DuctileIronFittingsOverviewRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Ductile iron fittings overview with ID ${id} not found`);
    }

    await this.DuctileIronFittingsOverviewRepo.remove(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings overview deleted successfully',
    };
  }

  ///////////////////////Details/////////////////////////////////////////
  // CREATE
  async createDetails(createDto: DuctileIronFittingsDetailsDto) {
    const newApp = this.DuctileIronFittingsDetailsRepo.create(createDto);
    const data = await this.DuctileIronFittingsDetailsRepo.save(newApp);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Ductile iron fittings details created successfully.',
      data,
    };
  }
  // GET ALL
  async findAllDetails() {
    const data = await this.DuctileIronFittingsDetailsRepo.find({ order: { id: 'DESC' } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings details fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findDetailsById(id: number) {
    const app = await this.DuctileIronFittingsDetailsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Ductile iron fittings details with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings details fetched successfully',
      data: app,
    };
  }

  // UPDATE
  async updateDetails(id: number, updateDto: DuctileIronFittingsDetailsDto) {
    const app = await this.DuctileIronFittingsDetailsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Ductile iron fittings details with ID ${id} not found`);
    }

    Object.assign(app, updateDto);
    const data = await this.DuctileIronFittingsDetailsRepo.save(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings details updated successfully',
      data,
    };
  }

  // DELETE
  async deleteDetails(id: number) {
    const app = await this.DuctileIronFittingsDetailsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Ductile iron fittings details with ID ${id} not found`);
    }

    await this.DuctileIronFittingsDetailsRepo.remove(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings details deleted successfully',
    };
  }
}
