import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountOfJointVenture } from 'src/entity/accounts_of_joint_venture.entity';


@Injectable()
export class FrontendAccountofJointVentureService {
  constructor(
    @InjectRepository(AccountOfJointVenture)
    private readonly AccountofJointVentureRepo: Repository<AccountOfJointVenture>,
  ) {}

  async getAccountofJointVentureData() {
    const AccountofJointVenture = await this.AccountofJointVentureRepo.find();
    return {
      statusCode: 200,
      message: AccountofJointVenture.length > 0 
        ? 'AccountofJointVenture fetched successfully' 
        : 'No AccountofJointVenture found',
      data: AccountofJointVenture,
    };
  }
}
