import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LatestElectrosteel} from '../../../entity/latest_electrosteel.entity'

@Injectable()
export class FrontendLatestElectrosteelService {
  constructor(
    @InjectRepository(LatestElectrosteel)
    private readonly LatestElectrosteelRepo: Repository<LatestElectrosteel>,
  ) {}
  //get the LatestElectrosteel data
    async getLatestElectrosteelData() {
        try{
            const LatestElectrosteel = await this.LatestElectrosteelRepo.find({
                order: {
                id: 'DESC',
                },
            });

            return {
                statusCode: 200,
                message:
                LatestElectrosteel.length > 0
                    ? 'Latest electrosteel data fetched successfully'
                    : 'No Latest electrosteel data found',
                data: LatestElectrosteel,
            };
        } catch(error){
            console.log("error when try to fetch latest electrosteel data", error);
            throw error;
        }
    }
}