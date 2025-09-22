import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnclaimedDividends } from '../../../entity/unclaimed_dividends.entity';
import { UnclaimedDividendsImagesDto } from 'src/dto/unclaimed_dividends_images.dto';
import { UnclaimedDividendsDto } from '../../../dto/unclaimed_dividends.dto';
import { UnclaimedDividendsImages } from 'src/entity/unclaimed_dividends_images.entity';

@Injectable()
export class UnclaimedDividendsService {
  constructor(
    @InjectRepository(UnclaimedDividends)
    private readonly UnclaimedDividendsRepo: Repository<UnclaimedDividends>,
    @InjectRepository(UnclaimedDividendsImages)
    private readonly UnclaimedDividendsImagesRepo: Repository<UnclaimedDividendsImages>,
  ) {}

    //////////UnclaimedDividends pipes/////////////
    // CREATE

    async create(createDto: UnclaimedDividendsDto) {
        const { name, documents } = createDto;

        const dividend = this.UnclaimedDividendsRepo.create({ name });
        const savedDividend = await this.UnclaimedDividendsRepo.save(dividend);

        if (documents && documents.length > 0) {
            const imagesToSave = documents.map(img => 
                this.UnclaimedDividendsImagesRepo.create({
                    title: img.title,
                    image: img.image,
                    unclaimedDividend: savedDividend,
                })
            );

            await this.UnclaimedDividendsImagesRepo.save(imagesToSave);
        }

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Dividend created successfully',
            data: savedDividend,
        };
    }


    // GET ALL
    async findAll() {
        const data = await this.UnclaimedDividendsRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'All 160 Notices fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.UnclaimedDividendsRepo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`UnclaimedDividends with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: '160 Notice fetched successfully',
        data: share_holding_information,
        };
    }

    // UPDATE
    async update(id: number, updateDto: UnclaimedDividendsDto) {
        const { name, documents } = updateDto;

        const dividend = await this.UnclaimedDividendsRepo.findOneBy({id});
        if(!dividend){
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Divided not found'
            }
        }
        dividend.name= name;
        const savedDividend = await this.UnclaimedDividendsRepo.save(dividend);
        if(documents && documents.length > 0){
            await this.UnclaimedDividendsImagesRepo.delete({unclaimedDividend:{id}});
            const imageTosave = documents.map(img =>
                this.UnclaimedDividendsImagesRepo.create({
                    title: img.title,
                    image: img.image,
                    unclaimedDividend: savedDividend,
                })
            )           
            await this.UnclaimedDividendsImagesRepo.save(imageTosave);
        }
        
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Dividend created successfully',
            data: savedDividend,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.UnclaimedDividendsRepo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`UnclaimedDividends with ID ${id} not found`);
        }

        await this.UnclaimedDividendsRepo.remove(share_holding_information);

        return {
        statusCode: HttpStatus.OK,
        message: '160 Notice deleted successfully',
        };
    }
}
