import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DuctileIronFittingsOverview } from 'src/entity/ductile_iron_fittings_overview.entity';
import { DuctileIronFittingsOverviewDto } from 'src/dto/ductile_iron_fittings_overview.dto';
import { DuctileIronFittingsDetails } from 'src/entity/ductile_iron_fittings_details.entity';
import { DuctileIronFittingsDetailsDto } from 'src/dto/ductile_iron_fittings_details.dto';
import { DuctileIronFittingsApplications } from 'src/entity/ductile_iron_fittings_application.entity';
import { DuctileIronFittingsApplicationsDto } from 'src/dto/ductile_iron_fittings_application.dto';
import { FittingsPipesJointing } from 'src/entity/ductile_iron_fittings_pipe_jointing.entity';
import { FittingsPipesJointingDto } from 'src/dto/ductile_iron_fittings_pipe_jointing.dto';

@Injectable()
export class ProductDuctileIronFittingsService {
  constructor(
    @InjectRepository(DuctileIronFittingsOverview)
    private readonly DuctileIronFittingsOverviewRepo: Repository<DuctileIronFittingsOverview>,
    @InjectRepository(DuctileIronFittingsDetails)
    private readonly DuctileIronFittingsDetailsRepo: Repository<DuctileIronFittingsDetails>,
    @InjectRepository(DuctileIronFittingsApplications)
    private readonly DuctileIronFittingsApplicationsRepo: Repository<DuctileIronFittingsApplications>,
    @InjectRepository(FittingsPipesJointing)
    private readonly FittingsPipesJointingRepo: Repository<FittingsPipesJointing>
  ) {}

  // CREATE
  async createOverview(createDto: DuctileIronFittingsOverviewDto) {
    const newApp = this.DuctileIronFittingsOverviewRepo.create(createDto);
    const data = await this.DuctileIronFittingsOverviewRepo.save(newApp);

    return {
      status: true,
      statusCode: HttpStatus.CREATED,
      message: 'Ductile iron fittings overview created successfully.',
      data,
    };
  }
  // GET ALL
  async findAllOverviews() {
    const data = await this.DuctileIronFittingsOverviewRepo.find({ order: { id: 'DESC' } });
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings overview fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findOverviewById(id: number) {
    const app = await this.DuctileIronFittingsOverviewRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Ductile iron fittings overview with ID ${id} not found`,
      });
    }
    return {
      status: true,
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
      throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Ductile iron fittings overview with ID ${id} not found`,
      });
    }

    Object.assign(app, updateDto);
    const data = await this.DuctileIronFittingsOverviewRepo.save(app);

    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings overview updated successfully',
      data,
    };
  }

  // DELETE
  async deleteOverview(id: number) {
    const app = await this.DuctileIronFittingsOverviewRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Ductile iron fittings overview with ID ${id} not found`,
      });
    }

    await this.DuctileIronFittingsOverviewRepo.remove(app);

    return {
      status: true,
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
      status: true,
      statusCode: HttpStatus.CREATED,
      message: 'Ductile iron fittings details created successfully.',
      data,
    };
  }
  // GET ALL
  async findAllDetails() {
    const data = await this.DuctileIronFittingsDetailsRepo.find({ order: { id: 'DESC' } });
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings details fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findDetailsById(id: number) {
    const app = await this.DuctileIronFittingsDetailsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Ductile iron fittings details with ID ${id} not found`,
      });
    }
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings details fetched successfully',
      data: app,
    };
  }

  // UPDATE
  async updateDetails(id: number, updateDto: DuctileIronFittingsDetailsDto) {
    const app = await this.DuctileIronFittingsDetailsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Ductile iron fittings details with ID ${id} not found`,
      });
    }

    Object.assign(app, updateDto);
    const data = await this.DuctileIronFittingsDetailsRepo.save(app);

    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings details updated successfully',
      data,
    };
  }

  // DELETE
  async deleteDetails(id: number) {
    const app = await this.DuctileIronFittingsDetailsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Ductile iron fittings details with ID ${id} not found`,
      });
    }
 
    await this.DuctileIronFittingsDetailsRepo.remove(app);

    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings details deleted successfully',
    };
  }

  ///////////////////////Applications/////////////////////////////////////////
  // CREATE
  async createApplication(createDto: DuctileIronFittingsApplicationsDto) {
    const newApp = this.DuctileIronFittingsApplicationsRepo.create(createDto);
    const data = await this.DuctileIronFittingsApplicationsRepo.save(newApp);

    return {
      status: true,
      statusCode: HttpStatus.CREATED,
      message: 'Ductile iron fittings application created successfully.',
      data,
    };
  }
  // GET ALL
  async findAllApplications() {
    const data = await this.DuctileIronFittingsApplicationsRepo.find({ order: { id: 'DESC' } });
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'All ductile iron fittings applications fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findApplicationById(id: number) {
    const app = await this.DuctileIronFittingsApplicationsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Ductile iron fittings application with ID ${id} not found`,
      });
    }
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings application fetched successfully',
      data: app,
    };
  }

  // UPDATE
  async updateApplication(id: number, updateDto: DuctileIronFittingsApplicationsDto) {
    const app = await this.DuctileIronFittingsApplicationsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Ductile iron fittings application with ID ${id} not found`,
      });
    }

    Object.assign(app, updateDto);
    const data = await this.DuctileIronFittingsApplicationsRepo.save(app);

    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings application updated successfully',
      data,
    };
  }

  // DELETE
  async deleteApplication(id: number) {
    const app = await this.DuctileIronFittingsApplicationsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Ductile iron fittings application with ID ${id} not found`,
      });
    }

    await this.DuctileIronFittingsApplicationsRepo.remove(app);

    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings application deleted successfully',
    };
  }

   ///////////////////////PipeJointing/////////////////////////////////////////
  // CREATE
  async createPipeJointing(createDto: FittingsPipesJointingDto) {
    const newApp = this.FittingsPipesJointingRepo.create(createDto);
    const data = await this.FittingsPipesJointingRepo.save(newApp);

    return {
      status: true,
      statusCode: HttpStatus.CREATED,
      message: 'Ductile iron fittings pipe jointing created successfully.',
      data,
    };
  }
  // GET ALL
  async findAllPipeJointings() {
    const data = await this.FittingsPipesJointingRepo.find({ order: { id: 'DESC' }, relations: ['details'] });
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'All ductile iron fittings pipe jointings fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findPipeJointingById(id: number) {
    const app = await this.FittingsPipesJointingRepo.findOne({ where: { id },relations: ['details'], });
    if (!app) {
      throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Ductile iron fittings pipe jointing with ID ${id} not found`,
      });
    }
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings pipe jointing fetched successfully',
      data: app,
    };
  }

  // UPDATE
  async updatePipeJointing(id: number, updateDto: FittingsPipesJointingDto) {
    const app = await this.FittingsPipesJointingRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Ductile iron fittings pipe jointing with ID ${id} not found`,
      });
    }

    Object.assign(app, updateDto);
    const data = await this.FittingsPipesJointingRepo.save(app);

    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings pipe jointing updated successfully',
      data,
    };
  }

  // DELETE
  async deletePipeJointing(id: number) {
    const app = await this.FittingsPipesJointingRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Ductile iron fittings pipe jointing with ID ${id} not found`,
      });
    }

    await this.FittingsPipesJointingRepo.remove(app);

    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Ductile iron fittings pipe jointing deleted successfully',
    };
  }
}
