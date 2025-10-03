import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsLetter} from '../../../entity/news_letter.entity'

@Injectable()
export class FrontendNewsletterService {
  constructor(
    @InjectRepository(NewsLetter)
    private readonly NewsletterRepo: Repository<NewsLetter>,
  ) {}
  //get the Newsletter data
    async getNewsletterData() {
        try{
            const Newsletter = await this.NewsletterRepo.find({
                order: {
                id: 'DESC',
                },
            });

            return {
                statusCode: 200,
                message:
                Newsletter.length > 0
                    ? 'News letter fetched successfully'
                    : 'No news letter data found',
                data: Newsletter,
            };
        } catch(error){
            console.log("error when try to fetch news letters", error);
            throw error;
        }
    }
}