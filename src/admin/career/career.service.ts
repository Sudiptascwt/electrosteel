import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElectrosteelSlider } from '../../entity/electrosteel_slider.entity';
import { ElectroSteelSliderDto } from '../../dto/electrosteel_slider.dto';
import { LifeElectrosteelContent } from 'src/entity/life_electrosteel_content.entity';
import { CreateLifeElectrosteelContentDto } from 'src/dto/life_electrosteel_content.dto';
import { FraudAlert } from 'src/entity/fraud_alert.entity';
import { FraudAlertDto } from 'src/dto/fraud_alert.dto';
@Injectable()
export class CareerService {
    constructor(
        @InjectRepository(ElectrosteelSlider)
        private readonly ElectrosteelSliderRepository: Repository<ElectrosteelSlider>,

        @InjectRepository(LifeElectrosteelContent)
        private readonly ElectrosteelLifeContentRepository: Repository<LifeElectrosteelContent>,

        @InjectRepository(FraudAlert)
        private readonly FraudAlertRepository: Repository<FraudAlert>,
    ) {}
    

    // CREATE
    async create(createDto: ElectroSteelSliderDto) {
        try {
        const newElectrosteelSlider = this.ElectrosteelSliderRepository.create(createDto);
        const savedElectrosteelSlider = await this.ElectrosteelSliderRepository.save(newElectrosteelSlider);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Electrosteel slider image created successfully',
            data: savedElectrosteelSlider,
        };
        } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while creating Electrosteel slider image',
            error: error.message,
        };
        }
  }

    // GET ALL
    async findAll() {
        const data = await this.ElectrosteelSliderRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Electrosteel slider images fetched successfully' : 'No Electrosteel slider images found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const About = await this.ElectrosteelSliderRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Electrosteel slider image with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Electrosteel slider image fetched successfully',
            data: About,
        };
    }

    // UPDATE
    async update(id: number, updateDto: ElectroSteelSliderDto) {
        const About = await this.ElectrosteelSliderRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Electrosteel slider image with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.ElectrosteelSliderRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Electrosteel slider image updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.ElectrosteelSliderRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Electrosteel slider image with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Electrosteel slider image deleted successfully'
        };
    }
    //////career life contents//////
    // CREATE
    async createLifeContent(createDto: CreateLifeElectrosteelContentDto) {
        try {
        const newElectrosteelSlider = this.ElectrosteelLifeContentRepository.create(createDto);
        const savedElectrosteelSlider = await this.ElectrosteelLifeContentRepository.save(newElectrosteelSlider);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Electrosteel slider image created successfully',
            data: savedElectrosteelSlider,
        };
        } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while creating Electrosteel slider image',
            error: error.message,
        };
        }
  }

    // GET ALL
    async findAllLifeContents() {
        const data = await this.ElectrosteelLifeContentRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Electrosteel slider images fetched successfully' : 'No Electrosteel slider images found',
            data,
        };
    }

    // GET BY ID
    async findLifeContentById(id: number) {
        const About = await this.ElectrosteelLifeContentRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Electrosteel slider image with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Electrosteel slider image fetched successfully',
            data: About,
        };
    }

    // UPDATE
    async updateLifeContent(id: number, updateDto: CreateLifeElectrosteelContentDto) {
        const About = await this.ElectrosteelLifeContentRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Electrosteel slider image with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.ElectrosteelLifeContentRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Electrosteel slider image updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async deleteLifeContent(id: number) {
        const result = await this.ElectrosteelLifeContentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Electrosteel slider image with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Electrosteel slider image deleted successfully'
        };
    }


    ///////////// fraud alert/////////////
    // CREATE
    async createFraudAlert(createDto: FraudAlertDto) {
        try {
        const newFraudAlert = this.FraudAlertRepository.create(createDto);
        const savedFraudAlert = await this.FraudAlertRepository.save(newFraudAlert);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'FraudAlert for career created successfully',
            data: savedFraudAlert,
        };
        } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while creating Electrosteel slider image',
            error: error.message,
        };
        }
  }

    // GET ALL
    async findFraudAlert() {
        const data = await this.FraudAlertRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Fraud alert fetched successfully' : 'No fraud alert found',
            data,
        };
    }

    // GET BY ID
    async findFraudAlertById(id: number) {
        const About = await this.FraudAlertRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Fraud alert with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Fraud alert fetched successfully',
            data: About,
        };
    }

    // UPDATE
    async updateFraudAlert(id: number, updateDto: FraudAlertDto) {
        const About = await this.FraudAlertRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Fraud alert with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.FraudAlertRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Fraud alert updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async deleteFraudAlert(id: number) {
        const result = await this.FraudAlertRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Fraud alert with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Fraud alert deleted successfully'
        };
    }
}
