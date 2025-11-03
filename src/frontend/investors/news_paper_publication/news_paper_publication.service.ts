import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
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

    //get quaterly result data by dates
    async getNewsPaperPublicationsDataByDates(start_date: string, end_date: string) {
        try {
            const data = await this.NewsPaperPublicationRepo.find({
            where: {
                start_date: MoreThanOrEqual(start_date),
                end_date: LessThanOrEqual(end_date),
            },
            order: { id: 'DESC' },
            });
            return {
                statusCode: 200,
                message: data.length > 0
                    ? 'Newspaper publication data fetched successfully'
                    : 'No newspaper publication data found',
                data: data,
            };
        } catch (error) {
            console.error('Error fetching shareholding patterns:', error);
            throw error;
        }
    }
}