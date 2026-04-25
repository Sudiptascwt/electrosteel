import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  { ProcessInnovationHero } from '../../../entity/process_innovation_hero.entity'
import { ProcessInnovationHeroDto } from 'src/dto/process_innovation_hero.dto';
import { PipesToInhospitableKargil } from '../../../entity/pipes_to_inhospitable_kargil.entity';
import { PipesToInhospitableKargilDto } from '../../../dto/pipestoinhospitablekargil.dto';
import { ElectrosteelIsroDto } from '../../../dto/electrosteel_isro.dto';
import { ElectrosteelIsro } from '../../../entity/electrosteel_isro.entity';
import { ViaHelicopter } from '../../../entity/ViaHelicopter.entity';
import { ViaHelicopterDto } from '../../../dto/ViaHelicopter.dto';
import { ReachingStars } from '../../../entity/ReachingStars.entity';
import { ReachingStarsDto } from '../../../dto/ReachingStars.dto';
import { UltimateDIPipes } from '../../../entity/UltimateDIPipes.entity';
import { UltimateDIPipesDto } from '../../../dto/UltimateDIPipes.dto';
import { changiWater } from '../../../entity/changiWater.entity';
import { changiWaterDto } from '../../../dto/changiWater.dto';

@Injectable()
export class process_innovationService {
  constructor(
    @InjectRepository(ProcessInnovationHero)
    private ProcessInnovationHeroRepository: Repository<ProcessInnovationHero>,

    @InjectRepository(PipesToInhospitableKargil)
    private PipesToInhospitableKargilRepository: Repository<PipesToInhospitableKargil>,

    @InjectRepository(ElectrosteelIsro)
    private electrosteelIsroRepository: Repository<ElectrosteelIsro>,

    @InjectRepository(ReachingStars)
    private ReachingStarsRepository: Repository<ReachingStars>,

    @InjectRepository(ViaHelicopter)
    private ViaHelicopterRepository: Repository<ViaHelicopter>,

    @InjectRepository(UltimateDIPipes)
    private UltimateDIPipesRepository: Repository<UltimateDIPipes>,

    @InjectRepository(changiWater)
    private changiWaterRepository: Repository<changiWater>,


  ) {}

  // ============ About Main Methods ============

  async saveProcessInnovationHero(data:ProcessInnovationHeroDto) {
    if (!data) {
      throw new Error("No data received");
    }
    let existingRecords = await this.ProcessInnovationHeroRepository.find();

    if (existingRecords && existingRecords.length > 0) {
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title;
      recordToUpdate.banner = data.banner;
      
      const savedRecord = await this.ProcessInnovationHeroRepository.save(recordToUpdate);
      
      return {
        status: true,
        statusCode: 200,
        message: 'Process Innovation Hero data updated successfully.',
        data: savedRecord
      };
    } else {
      const newRecord = this.ProcessInnovationHeroRepository.create({
        title: data.title,
        banner: data.banner
      });
      
      const savedRecord = await this.ProcessInnovationHeroRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: 'Process Innovation Hero data created successfully.',
        data: savedRecord
      };
    }
  }

  async getProcessInnovationHero() {
    const existingData = await this.ProcessInnovationHeroRepository.find({});
    
    if (!existingData || existingData.length === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'Process Innovation Hero data not found',
        data: [],
      };
    }
    
    return {
      status: true,
      statusCode: 200,
      message: 'Process Innovation Hero data fetched successfully',
      data: existingData
    };
  }

  async savePipesToInhospitableKargil(data:PipesToInhospitableKargilDto) {
    if (!data) {
      throw new Error("No data received");
    }
    let existingRecords = await this.PipesToInhospitableKargilRepository.find();

    if (existingRecords && existingRecords.length > 0) {
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title;
      recordToUpdate.description = data.description;
      recordToUpdate.image = data.image;
      
      const savedRecord = await this.PipesToInhospitableKargilRepository.save(recordToUpdate);
      
      return {
        status: true,
        statusCode: 200,
        message: 'PipesToInhospitableKargil data updated successfully.',
        data: savedRecord
      };
    } else {
      const newRecord = this.PipesToInhospitableKargilRepository.create({
        title: data.title,
        description: data.description,
        image: data.image,
      });
      
      const savedRecord = await this.PipesToInhospitableKargilRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: 'PipesToInhospitableKargil data created successfully.',
        data: savedRecord
      };
    }
  }

  async getPipesToInhospitableKargil() {
    const existingData = await this.PipesToInhospitableKargilRepository.find({});
    
    if (!existingData || existingData.length === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'PipesToInhospitableKargil data not found',
        data: [],
      };
    }
    
    return {
      status: true,
      statusCode: 200,
      message: 'PipesToInhospitableKargil data fetched successfully',
      data: existingData
    };
  }

  async saveOrUpdateElectrosteelIsroData(data: ElectrosteelIsroDto) {
    if (!data) {
      throw new BadRequestException('data is required');
    }

    // Find existing records - this returns an ARRAY
    let existingRecords = await this.electrosteelIsroRepository.find();

    // Check if array has records
    if (existingRecords && existingRecords.length > 0) {
      // Get the first record from the array
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title ?? recordToUpdate.title;
      recordToUpdate.description = data.description ?? recordToUpdate.description;
      recordToUpdate.image = data.image ?? recordToUpdate.image;
      
      const savedRecord = await this.electrosteelIsroRepository.save(recordToUpdate);
      
      return {
        status: true,
        statusCode: 200,
        message: `Electrosteel Isro data updated successfully.`,
        data: savedRecord
      };
    } else {
      // Create new record
      const newRecord = this.electrosteelIsroRepository.create({
        title: data.title,
        description: data.description,
        image: data.image
      });
      
      const savedRecord = await this.electrosteelIsroRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: `Electrosteel Isro data created successfully.`,
        data: savedRecord
      };
    }
  }

  async getAllElectrosteelIsroData() {
    const existingData = await this.electrosteelIsroRepository.find({
      order: {
        created_at: 'ASC'
      }
    });
    
    if (!existingData || existingData.length === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'No Electrosteel ISRO data found',
        data: [],
      };
    }
    
    return {
      status: true,
      statusCode: 200,
      message: 'Electrosteel ISRO data fetched successfully',
      data: existingData
    };
  }

  async saveReachingStars(data: ReachingStarsDto) {
    if (!data) {
      throw new BadRequestException('data is required');
    }

    // Find existing records - this returns an ARRAY
    let existingRecords = await this.ReachingStarsRepository.find();

    // Check if array has records
    if (existingRecords && existingRecords.length > 0) {
      // Get the first record from the array
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title ?? recordToUpdate.title;
      recordToUpdate.description = data.description ?? recordToUpdate.description;
      recordToUpdate.image = data.image ?? recordToUpdate.image;
      
      const savedRecord = await this.ReachingStarsRepository.save(recordToUpdate);
      
      return {
        status: true,
        statusCode: 200,
        message: `Reaching Stars data updated successfully.`,
        data: savedRecord
      };
    } else {
      // Create new record
      const newRecord = this.ReachingStarsRepository.create({
        title: data.title,
        description: data.description,
        image: data.image
      });
      
      const savedRecord = await this.ReachingStarsRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: `Reaching Stars data created successfully.`,
        data: savedRecord
      };
    }
  }

  async getReachingStars() {
    const existingData = await this.ReachingStarsRepository.find({
      order: {
        created_at: 'ASC'
      }
    });
    
    if (!existingData || existingData.length === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'No Reaching Stars data found',
        data: [],
      };
    }
    
    return {
      status: true,
      statusCode: 200,
      message: 'Reaching Stars data fetched successfully',
      data: existingData
    };
  }

  async saveViaHelicopter(@Body() data: ViaHelicopterDto) {
    if (!data) {
      throw new BadRequestException('data is required');
    }

    // Find existing records - this returns an ARRAY
    let existingRecords = await this.ViaHelicopterRepository.find();

    // Check if array has records
    if (existingRecords && existingRecords.length > 0) {
      // Get the first record from the array
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title ?? recordToUpdate.title;
      recordToUpdate.description = data.description ?? recordToUpdate.description;
      recordToUpdate.image = data.image ?? recordToUpdate.image;
      
      const savedRecord = await this.ViaHelicopterRepository.save(recordToUpdate);
      
      return {
        status: true,
        statusCode: 200,
        message: `Helicopter data updated successfully.`,
        data: savedRecord
      };
    } else {
      // Create new record
      const newRecord = this.ViaHelicopterRepository.create({
        title: data.title,
        description: data.description,
        image: data.image
      });
      
      const savedRecord = await this.ViaHelicopterRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: `Helicopter data created successfully.`,
        data: savedRecord
      };
    }
  }

  async getViaHelicopter() {
    const existingData = await this.ViaHelicopterRepository.find({
      order: {
        created_at: 'ASC'
      }
    });
    
    if (!existingData || existingData.length === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'No Helicopter data found',
        data: [],
      };
    }
    
    return {
      status: true,
      statusCode: 200,
      message: 'Helicopter data fetched successfully',
      data: existingData
    };
  }

  async saveultimateDIPipes(@Body() data: UltimateDIPipesDto) {
    if (!data) {
      throw new BadRequestException('data is required');
    }

    // Find existing records - this returns an ARRAY
    let existingRecords = await this.UltimateDIPipesRepository.find();

    // Check if array has records
    if (existingRecords && existingRecords.length > 0) {
      // Get the first record from the array
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title ?? recordToUpdate.title;
      recordToUpdate.description = data.description ?? recordToUpdate.description;
      recordToUpdate.image = data.image ?? recordToUpdate.image;
      
      const savedRecord = await this.UltimateDIPipesRepository.save(recordToUpdate);
      
      return {
        status: true,
        statusCode: 200,
        message: `ultimateDIPipes data updated successfully.`,
        data: savedRecord
      };
    } else {
      // Create new record
      const newRecord = this.UltimateDIPipesRepository.create({
        title: data.title,
        description: data.description,
        image: data.image
      });
      
      const savedRecord = await this.UltimateDIPipesRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: `ultimateDIPipes data created successfully.`,
        data: savedRecord
      };
    }
  }

  async getultimateDIPipes() {
    const existingData = await this.UltimateDIPipesRepository.find({
      order: {
        created_at: 'ASC'
      }
    });
    
    if (!existingData || existingData.length === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'No ultimateDIPipes data found',
        data: [],
      };
    }
    
    return {
      status: true,
      statusCode: 200,
      message: 'ultimateDIPipes data fetched successfully',
      data: existingData
    };
  }

  async savechangiWater (@Body() data: changiWaterDto) {
    if (!data) {
      throw new BadRequestException('data is required');
    }

    // Find existing records - this returns an ARRAY
    let existingRecords = await this.changiWaterRepository.find();

    // Check if array has records
    if (existingRecords && existingRecords.length > 0) {
      // Get the first record from the array
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title ?? recordToUpdate.title;
      recordToUpdate.description = data.description ?? recordToUpdate.description;
      recordToUpdate.image = data.image ?? recordToUpdate.image;
      
      const savedRecord = await this.changiWaterRepository.save(recordToUpdate);
      
      return {
        status: true,
        statusCode: 200,
        message: `changiWater data updated successfully.`,
        data: savedRecord
      };
    } else {
      // Create new record
      const newRecord = this.changiWaterRepository.create({
        title: data.title,
        description: data.description,
        image: data.image
      });
      
      const savedRecord = await this.changiWaterRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: `changiWater data created successfully.`,
        data: savedRecord
      };
    }
  }

  async getchangiWater () {
    const existingData = await this.changiWaterRepository.find({
      order: {
        created_at: 'ASC'
      }
    });
    
    if (!existingData || existingData.length === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'No changiWater data found',
        data: [],
      };
    }
    
    return {
      status: true,
      statusCode: 200,
      message: 'changiWater data fetched successfully',
      data: existingData
    };
  }
}