import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsPaperPublication } from 'src/entity/newspaper_publication.entity';

@Injectable()
export class FrontendNewsPaperPublicationService {
  constructor(
    @InjectRepository(NewsPaperPublication)
    private readonly NewsPaperPublicationRepo: Repository<NewsPaperPublication>,
  ) {}
    //get quaterly result data
    async getNewsPaperPublicationsData() {
        try{
            const shareholding_patterns = await this.NewsPaperPublicationRepo.find({
                order: {
                id: 'DESC',
                },
            });

            return {
                statusCode: 200,
                message:
                shareholding_patterns.length > 0
                    ? 'News paper publication fetched successfully'
                    : 'No news paper publications found',
                data: shareholding_patterns,
            };
        } catch(error){
            console.log("error when try to fetch news paper publication.", error);
            throw error;
        }
    }
}