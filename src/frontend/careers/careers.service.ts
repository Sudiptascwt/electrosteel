import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Career } from '../../../entity/csr_projects.entity';
// import { CareerDto } from '../../../dto/csr_projects.dto';
import { ElectrosteelSlider } from 'src/entity/electrosteel_slider.entity';
import { ElectroSteelSliderDto } from 'src/dto/electrosteel_slider.dto';

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(ElectrosteelSlider)
    private readonly CareersRepo: Repository<ElectrosteelSlider>,
  ) {}

  async getCareerData() {
    const electrosteel_sliders = await this.CareersRepo.find();
    return electrosteel_sliders
  }
}