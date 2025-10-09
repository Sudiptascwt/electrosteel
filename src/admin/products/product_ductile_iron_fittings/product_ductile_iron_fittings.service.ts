import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DuctileIronPipeDetails } from 'src/entity/ductile_iron_pipes_details.entity';
import { DuctileIronPipesOverview } from 'src/entity/ductile_iron_pipes_overview.entity';
import { DuctileIronDetailsDto } from 'src/dto/ductile_iron_pipes_details.dto';
import { DuctileIronPipesOverviewDto } from 'src/dto/ductile_iron_pipes_overview.dto';
import { DuctileIronPipeApplications } from 'src/entity/ductile_iron_pipes_application.entity';
import { DuctileIronPipeApplicationsDto } from 'src/dto/ductile_iron_pipes_application.dto';
import { PipesJointingDto } from 'src/dto/pipes_jointing.dto';
import { PipesJointing } from 'src/entity/pipes_jointing.entity';
import { PipesJointingDetails } from 'src/entity/pipes_jointing_details.entity';

@Injectable()
export class ProductDuctileIronFittingsService {
  constructor(
    @InjectRepository(DuctileIronPipeDetails)
    private readonly DuctileIronPipeDetailsRepo: Repository<DuctileIronPipeDetails>,
    @InjectRepository(DuctileIronPipesOverview)
    private readonly DuctileIronPipesOverviewRepo: Repository<DuctileIronPipesOverview>,
    @InjectRepository(DuctileIronPipeApplications)
    private readonly DuctileIronPipeApplicationsRepo: Repository<DuctileIronPipeApplications>,
    @InjectRepository(PipesJointing)
    private readonly PipesJointingRepo: Repository<PipesJointing>,
    @InjectRepository(PipesJointingDetails)
    private readonly PipesJointingDetailsRepo: Repository<PipesJointingDetails>,
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

  ///////////////////////Applications///////////////////////////////////////
  // CREATE
  async createApplication(createDto: DuctileIronPipeApplicationsDto) {
    const newApp = this.DuctileIronPipeApplicationsRepo.create(createDto);
    const data = await this.DuctileIronPipeApplicationsRepo.save(newApp);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Ductile iron pipe application created successfully.',
      data,
    };
  }
  // GET ALL
  async findAllApplications() {
    const data = await this.DuctileIronPipeApplicationsRepo.find({ order: { id: 'DESC' } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron pipe applications fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findApplicationById(id: number) {
    const app = await this.DuctileIronPipeApplicationsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Ductile iron pipe application with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron pipe details fetched successfully',
      data: app,
    };
  }

  // UPDATE
  async updateApplication(id: number, updateDto: DuctileIronPipeApplicationsDto) {
    const app = await this.DuctileIronPipeApplicationsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Ductile iron pipe application with ID ${id} not found`);
    }

    Object.assign(app, updateDto);
    const data = await this.DuctileIronPipeApplicationsRepo.save(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron pipe details updated successfully',
      data,
    };
  }

  // DELETE
  async deleteApplication(id: number) {
    const app = await this.DuctileIronPipeApplicationsRepo.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`Ductile iron pipe details with ID ${id} not found`);
    }

    await this.DuctileIronPipeApplicationsRepo.remove(app);

    return {
      statusCode: HttpStatus.OK,
      message: 'Ductile iron pipe details deleted successfully',
    };
  }

  ///////////////////////pipe jointing///////////////////////////////////////
  // CREATE
  async createPipeJointing(createDto: PipesJointingDto) {
    const jointing = this.PipesJointingRepo.create(createDto);
    const data= await this.PipesJointingRepo.save(jointing); 

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Pipe jointing created successfully.',
      data,
    };
  }
  // GET ALL
  async findAllPipeJointings() {
    const data = await this.PipesJointingRepo.find({ relations: ['details'] });
    return {
      statusCode: HttpStatus.OK,
      message: 'Pipe jointings fetched successfully',
      data,
    };
  }

  // GET BY ID
  async findPipeJointingById(id: number) {
    const jointing = await this.PipesJointingRepo.findOne({
      where: { id },
      relations: ['details'],
    });
    if (!jointing) {
      throw new NotFoundException(`Pipe jointing with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Pipe jointing fetched successfully',
      data: jointing,
    };
  }

  // UPDATE
  async updatePipeJointing(id: number, updateDto: PipesJointingDto) {
    const jointing = await this.PipesJointingRepo.findOne({
      where: { id },
      relations: ['details'],
    });

    if (!jointing) throw new NotFoundException('PipeJointing not found');

    if (jointing.details && jointing.details.length > 0) {
      await this.PipesJointingDetailsRepo.remove(jointing.details); 
      jointing.details = [];
    }

    this.PipesJointingRepo.merge(jointing, updateDto);

    if (updateDto.details && updateDto.details.length > 0) {
      jointing.details = updateDto.details.map((d) =>
        this.PipesJointingDetailsRepo.create(d),
      );
    }

    const updated_data= await this.PipesJointingRepo.save(jointing);
    return {
      statusCode: HttpStatus.OK,
      message: 'Pipe jointing updated successfully',
      data: updated_data
    };
  }

  // DELETE
  async deletePipeJointing(id: number) {
    const jointing = await this.PipesJointingRepo.findOne({ where: { id } });
    if (!jointing) {
      throw new NotFoundException(`Pipe jointing with ID ${id} not found`);
    }
    const data = await this.PipesJointingRepo.remove(jointing); 
    return {
      statusCode: HttpStatus.OK,
      message: 'Pipe jointing deleted successfully',
    };
  }
}
