import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DuctileIronPipeDetails } from 'src/entity/ductile_iron_pipes_details.entity';
import { DuctileIronPipesOverview } from 'src/entity/ductile_iron_pipes_overview.entity';
import { DuctileIronDetailsDto } from 'src/dto/ductile_iron_pipes_details.dto';
import { DuctileIronPipesOverviewDto } from 'src/dto/ductile_iron_pipes_overview.dto';


@Injectable()
export class ProductDuctileIronService {
  constructor(
    @InjectRepository(DuctileIronPipeDetails)
    private readonly DuctileIronPipeDetailsRepo: Repository<DuctileIronPipeDetails>,
    @InjectRepository(DuctileIronPipesOverview)
    private readonly DuctileIronPipesOverviewRepo: Repository<DuctileIronPipesOverview>,
  ) {}

  // CREATE
  async createOverview(createDto: DuctileIronPipesOverviewDto) {
    const newApp = this.DuctileIronPipesOverviewRepo.create(createDto);
    const data = await this.DuctileIronPipesOverviewRepo.save(newApp);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Ductile iron pipe overview created successfully.',
      data,
    };
  }
  // GET ALL
  async findAllOverviews() {
    const data = await this.DuctileIronPipesOverviewRepo.find({ order: { id: 'DESC' } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron pipe overview fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findOverviewById(id: number) {
    const app = await this.DuctileIronPipesOverviewRepo.findOne({ where: { id } });
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
  async updateOverview(id: number, updateDto: DuctileIronPipesOverviewDto) {
    const app = await this.DuctileIronPipesOverviewRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Ductile iron pipe overview with ID ${id} not found`);
    }

    Object.assign(app, updateDto);
    const data = await this.DuctileIronPipesOverviewRepo.save(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron pipe overview updated successfully',
      data,
    };
  }

  // DELETE
  async deleteOverview(id: number) {
    const app = await this.DuctileIronPipesOverviewRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Ductile iron pipe overview with ID ${id} not found`);
    }

    await this.DuctileIronPipesOverviewRepo.remove(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron pipe overview deleted successfully',
    };
  }


  ///////////////////////Details/////////////////////////////////////////
  // CREATE
  async createDetails(createDto: DuctileIronDetailsDto) {
    const newApp = this.DuctileIronPipeDetailsRepo.create(createDto);
    const data = await this.DuctileIronPipeDetailsRepo.save(newApp);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Ductile iron pipe details created successfully.',
      data,
    };
  }
  // GET ALL
  async findAllDetails() {
    const data = await this.DuctileIronPipeDetailsRepo.find({ order: { id: 'DESC' } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron pipe details fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findDetailsById(id: number) {
    const app = await this.DuctileIronPipeDetailsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Ductile iron pipe details with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron pipe details fetched successfully',
      data: app,
    };
  }

  // UPDATE
  async updateDetails(id: number, updateDto: DuctileIronDetailsDto) {
    const app = await this.DuctileIronPipeDetailsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Ductile iron pipe details with ID ${id} not found`);
    }

    Object.assign(app, updateDto);
    const data = await this.DuctileIronPipeDetailsRepo.save(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron pipe details updated successfully',
      data,
    };
  }

  // DELETE
  async deleteDetails(id: number) {
    const app = await this.DuctileIronPipeDetailsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Ductile iron pipe details with ID ${id} not found`);
    }

    await this.DuctileIronPipeDetailsRepo.remove(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron pipe details deleted successfully',
    };
  }
}
