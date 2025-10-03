import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElectrosteelSlider } from 'src/entity/electrosteel_slider.entity';
import { FraudAlert } from 'src/entity/fraud_alert.entity';

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(ElectrosteelSlider)
    private readonly CareersRepo: Repository<ElectrosteelSlider>,
    @InjectRepository(FraudAlert)
    private readonly FraudAlertRepo: Repository<FraudAlert>,
  ) {}

  async getCareerData() {
    const electrosteel_sliders = await this.CareersRepo.find();
    return {
      statusCode: 200,
      message: electrosteel_sliders.length > 0 
        ? 'Career data fetched successfully' 
        : 'No career data found',
      data: electrosteel_sliders,
    };
  }

  async getFraudAlertData() {
    const fraud_alert = await this.FraudAlertRepo.find();
    return {
      statusCode: 200,
      message: fraud_alert.length > 0 
        ? 'Fraud alert data for career fetched successfully' 
        : 'No fraud alert for career found',
      data: fraud_alert,
    };
  }
}