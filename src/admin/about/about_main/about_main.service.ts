import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutMain } from '../../../entity/about_main.entity';
import { growing_strength_data } from 'src/entity/growing_strength_data.entity';
import { AboutMainDto } from '../../../dto/about_main.dto';
import { growing_strength_dataDto } from '../../../dto/growing_strength_data.dto';
import { AboutDuctileIron } from 'src/entity/about_ductile_iron.entity';
import { AboutDuctileIronDto } from 'src/dto/about_ductile_iron.dto';
import { ManufacturingFacilities } from 'src/entity/manufacturing_facilities.entity';
import { ManufacturingFacilitiesDto } from 'src/dto/manufacturing_facilities.dto';
import { headings } from 'src/entity/headings.entity';
import { AboutPeopleData } from 'src/entity/about_people_data.entity';
import { AboutPeopleDataDto } from 'src/dto/about_people_data.dto';
import { about_technology_innovation } from 'src/entity/about_technology_innovation.entity';
import { about_technology_innovationDto } from 'src/dto/about_technology_innovation.dto';
import { CommonTitleDto } from 'src/dto/common_titles.dto';
import { CommonTitle } from 'src/entity/common_titles.entity';

@Injectable()
export class AboutMainService {
  constructor(
    @InjectRepository(AboutMain)
    private readonly aboutMainRepository: Repository<AboutMain>,
    
    @InjectRepository(growing_strength_data) 
    private readonly growingStrengthRepository: Repository<growing_strength_data>,

    @InjectRepository(AboutDuctileIron) 
    private readonly AboutDuctileIronRepository: Repository<AboutDuctileIron>,

    @InjectRepository(ManufacturingFacilities) 
    private readonly ManufacturingFacilitiesRepository: Repository<ManufacturingFacilities>,

    @InjectRepository(headings)
    private readonly headingsRepository: Repository<headings>,

    @InjectRepository(AboutPeopleData)
    private readonly AboutPeopleDataRepository: Repository<AboutPeopleData>,

    @InjectRepository(about_technology_innovation)
    private readonly about_technology_innovationRepository: Repository<about_technology_innovation>,

    @InjectRepository(CommonTitle)
    private readonly CommonTitleRepository: Repository<CommonTitle>,
  ) {}

  // ============ About Main Methods ============

  async saveAboutMain(data: AboutMainDto) {
    if (!data) {
      throw new Error("No data received");
    }
    let existingRecords = await this.aboutMainRepository.find();

    if (existingRecords && existingRecords.length > 0) {
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title;
      recordToUpdate.image = data.image;
      
      const savedRecord = await this.aboutMainRepository.save(recordToUpdate);
      
      return {
        status: true,
        statusCode: 200,
        message: 'About Main data updated successfully.',
        data: savedRecord
      };
    } else {
      const newRecord = this.aboutMainRepository.create({
        title: data.title,
        image: data.image
      });
      
      const savedRecord = await this.aboutMainRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: 'About Main data created successfully.',
        data: savedRecord
      };
    }
  }

  async getAllAboutMainData() {
    const existingData = await this.aboutMainRepository.find({});
    
    if (!existingData || existingData.length === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'About Main not found',
        data: [],
      };
    }
    
    return {
      status: true,
      statusCode: 200,
      message: 'About Main data fetched successfully',
      data: existingData
    };
  }

  // ============ Growing Strength Methods ============

  async GrowingStrengthsave(data: growing_strength_dataDto) {
    if (!data) {
      throw new Error("No data received");
    }
    console.log("Growing Strength data:", data);

    let existingRecords = await this.growingStrengthRepository.find();

    if (existingRecords && existingRecords.length > 0) {
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title;
      recordToUpdate.image = data.image;
      recordToUpdate.description = data.description;
      
      const savedRecord = await this.growingStrengthRepository.save(recordToUpdate);
      
      return {
        status: true,
        statusCode: 200,
        message: 'Growing Strength data updated successfully.',
        data: savedRecord
      };
    } else {
      const newRecord = this.growingStrengthRepository.create({
        title: data.title,
        image: data.image,
        description: data.description
      });
      
      const savedRecord = await this.growingStrengthRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: 'Growing Strength data created successfully.',
        data: savedRecord
      };
    }
  }

  async getAllGrowingStrengthData() {
    const existingData = await this.growingStrengthRepository.find({
    });
    
    if (!existingData || existingData.length === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'Growing Strength data not found',
        data: [],
      };
    }
    
    return {
      status: true,
      statusCode: 200,
      message: existingData.length
        ? 'Growing Strength data fetched successfully'
        : 'No Growing Strength data found.',
      data: existingData
    };
  }

  async saveDuctileIronPipes(data: AboutDuctileIronDto) {
    if (!data) {
      throw new Error("No data received");
    }

    let existingRecords = await this.AboutDuctileIronRepository.find();

    if (existingRecords && existingRecords.length > 0) {
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title;
      recordToUpdate.image = data.image;
      recordToUpdate.description = data.description;
      
      const savedRecord = await this.AboutDuctileIronRepository.save(recordToUpdate);
      
      return {
        status: true,
        statusCode: 200,
        message: 'About Ductile Iron data updated successfully.',
        data: savedRecord
      };
    } else {
      const newRecord = this.AboutDuctileIronRepository.create({
        title: data.title,
        image: data.image,
        description: data.description
      });
      
      const savedRecord = await this.AboutDuctileIronRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: 'About Ductile Iron data created successfully.',
        data: savedRecord
      };
    }
  }

  async getAllDuctileIronPipes() {
    const existingData = await this.AboutDuctileIronRepository.find({
    });
    
    if (!existingData || existingData.length === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'About Ductile Iron data not found',
        data: [],
      };
    }
    
    return {
      status: true,
      statusCode: 200,
      message: existingData.length
        ? 'About Ductile Iron data fetched successfully'
        : 'About Ductile Iron data found.',
      data: existingData
    };
  }

  async saveManufacturingfacilities(data: any) {
    try {
      const sectionType = "about_manufacturing_facilities";
      
      let heading = await this.headingsRepository.findOne({
        where: { section_type: sectionType }
      });

      if (heading) {
        heading.title = data.title;
        heading.description = data.description;
        await this.headingsRepository.save(heading);
      } else {
        const newHeading = this.headingsRepository.create({
          title: data.title,
          description: data.description,
          section_type: sectionType
        });
        heading = await this.headingsRepository.save(newHeading);
      }
      await this.ManufacturingFacilitiesRepository.clear();
      
      let savedFacilities = [];
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        const facilities = data.data.map(facility => 
          this.ManufacturingFacilitiesRepository.create({
            title: facility.title,
            description: facility.description,
            features: JSON.stringify(facility.features),
            phone: facility.phone,
            address: facility.address
          })
        );
        savedFacilities = await this.ManufacturingFacilitiesRepository.save(facilities);
      }

      return {
        status: true,
        statusCode: heading ? 200 : 201,
        message: heading ? 'Manufacturing data updated successfully.' : 'Manufacturing data created successfully.',
        data: {
          heading: heading,
          facilities: savedFacilities
        }
      };
    } catch (error) {
      console.error('Error in saveManufacturingfacilities:', error);
      return {
        status: false,
        statusCode: 500,
        message: 'Failed to save manufacturing data',
        error: error.message
      };
    }
  }

  async getAllManufacturingfacilities() {
    try {
      const heading = await this.headingsRepository.findOne({
        where: { section_type: "about_manufacturing_facilities" }
      });

      const facilities = await this.ManufacturingFacilitiesRepository.find();
      
      const formattedFacilities = facilities.map(record => ({
        title: record.title,
        description: record.description,
        features: record.features,
        phone: record.phone,
        address: record.address
      }));
      
      // Return in the exact format you specified
      return {
        title: heading?.title || null,
        description: heading?.description || null,
        data: formattedFacilities
      };
      
    } catch (error) {
      console.error('Error:', error);
      return {
        title: null,
        description: null,
        data: [],
        error: error.message
      };
    }
  }

  //our people
  async savePeopleData(data: any) {
    try {
      // Check if data is an array
      // if (!Array.isArray(data)) {
      //   return {
      //     status: false,
      //     statusCode: 400,
      //     message: 'Invalid data format. Expected array of people objects.',
      //     error: 'Data must be an array'
      //   };
      // }

      // if (data.length === 0) {
      //   return {
      //     status: false,
      //     statusCode: 400,
      //     message: 'Data array cannot be empty',
      //   };
      // }

      // Option 1: Replace all existing records (Clear and insert new)
      // Delete all existing records
      await this.AboutPeopleDataRepository.clear();
      
      // Create new records
      const newRecords = this.AboutPeopleDataRepository.create(data);
      const savedRecords = await this.AboutPeopleDataRepository.save(newRecords);
      
      return {
        status: true,
        statusCode: 200,
        message: `people records saved successfully.`,
        data: savedRecords
      };

    } catch (error) {
      console.error('Error in People data:', error);
      return {
        status: false,
        statusCode: 500,
        message: 'Failed to save People data',
        error: error.message
      };
    }
  }

  async getAllPeopleData() {
    try {
      let people_data = await this.AboutPeopleDataRepository.find();
      
      return {
        status: true,
        statusCode: 200,
        message: 'People data fetched successfully',
        data: people_data
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        status: false,
        statusCode: 500,
        message: 'Failed to fetch People data',
        error: error.message
      };
    }
  }

  async saveTechnologyInnovation(data: about_technology_innovationDto) {
    if (!data) {
      throw new Error("No data received");
    }

    let existingRecords = await this.about_technology_innovationRepository.find();


    if (existingRecords && existingRecords.length > 0) {
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title;
      recordToUpdate.description = data.description;
      recordToUpdate.video = data.video;
      recordToUpdate.buttonLink = data.buttonLink;
      
      const savedRecord = await this.about_technology_innovationRepository.save(recordToUpdate);
      
      return {
        status: true,
        statusCode: 200,
        message: 'About Ductile Iron data updated successfully.',
        data: savedRecord
      };
    } else {
        const newRecord = this.about_technology_innovationRepository.create({
          title: data.title, 
          description: data.description,  
          video: data.video,      
          buttonLink: data.buttonLink          
        });
        const savedRecord = await this.about_technology_innovationRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: 'About Ductile Iron data created successfully.',
        data: savedRecord
      };
    }
  }

  async getAllTechnologyInnovations() {
    const existingData = await this.about_technology_innovationRepository.find({
    });
    
    if (!existingData || existingData.length === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'About Technology Innovations data not found',
        data: [],
      };
    }
    
    return {
      status: true,
      statusCode: 200,
      message: existingData.length
        ? 'About Technology Innovations data fetched successfully'
        : 'About Technology Innovations data found.',
      data: existingData
    };
  }

  async saveCommonTitle(data: CommonTitleDto) {
    if (!data) {
      throw new Error("No data received");
    }
    let existingRecords = await this.CommonTitleRepository.find({
        where: { category: data.category }
    });
    
    if (existingRecords && existingRecords.length > 0) {
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title;
      recordToUpdate.sub_title = data.sub_title;
      recordToUpdate.category = data.category;
      recordToUpdate.description = data.description;
      
      const savedRecord = await this.CommonTitleRepository.save(recordToUpdate);
      
      return {
        status: true,
        statusCode: 200,
        message: 'Common title data updated successfully.',
        data: savedRecord
      };
    } else {
      const newRecord = this.CommonTitleRepository.create({
        title: data.title,
        category: data.category,
        sub_title: data.sub_title,
        description: data.description
      });
      
      const savedRecord = await this.CommonTitleRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: 'Common title data created successfully.',
        data: savedRecord
      };
    }
  }

  async getCommonTitle(category: string) {
      if (!category) {
          throw new Error('Category is required');
      }
      
      const existingData = await this.CommonTitleRepository.findOne({
          where: { category: category }
      });
      
      if (!existingData) {
        return {
            status: false,
            statusCode: 404,
            message: 'Common title not found',
            data: null
        };
      }
      
      return {
          status: true,
          statusCode: 200,
          message: 'Common title data fetched successfully',
          data: existingData
      };
  }
}