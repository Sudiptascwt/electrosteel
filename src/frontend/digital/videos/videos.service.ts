import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DigitalVideos } from 'src/entity/digital_videos.entity';

@Injectable()
export class FrontendVideosService {
  constructor(
    @InjectRepository(DigitalVideos)
    private readonly DigitalVideosRepo: Repository<DigitalVideos>,
  ) {}
  //get the Newsletter data
    async getDigitalVideosData() {
        try{
            const digital_videos = await this.DigitalVideosRepo.find({
                order: {
                id: 'DESC',
                },
            });

            return {
                statusCode: 200,
                message:
                digital_videos.length > 0
                    ? 'Digital videos fetched successfully'
                    : 'No digital video data found',
                data: digital_videos,
            };
        } catch(error){
            console.log("error when try to fetch digital video", error);
            throw error;
        }
    }
}