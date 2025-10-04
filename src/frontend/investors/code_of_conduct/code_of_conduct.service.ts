import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conduct } from 'src/entity/conduct.entity';
import { Policies } from 'src/entity/policies.entity';


@Injectable()
export class FrontendCodeOfConductService {
  constructor(
    @InjectRepository(Conduct)
    private readonly CodeOfConductRepo: Repository<Conduct>,
    @InjectRepository(Policies)
    private readonly PoliciesRepo: Repository<Policies>,
  ) {}

  async getCodeOfConductData() {
    const CodeOfConduct = await this.CodeOfConductRepo.find();
    return {
      statusCode: 200,
      message: CodeOfConduct.length > 0 
        ? 'CodeOfConduct fetched successfully' 
        : 'No CodeOfConduct found',
      data: CodeOfConduct,
    };
  }
  async getPoliciesData() {
    const policies = await this.PoliciesRepo.find();
    return {
      statusCode: 200,
      message: policies.length > 0 
        ? 'Policies fetched successfully' 
        : 'No policies found',
      data: policies,
    };
  }
}
