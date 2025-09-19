import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsPaperPublication } from '../../../entity/newspaper_publication.entity';
import { NewsPaperPublicationDto } from '../../../dto/newspaper_publication.dto';

@Injectable()
export class NewspaperPublicationService {
  constructor(
    @InjectRepository(NewsPaperPublication)
    private readonly NewspaperPublicationRepo: Repository<NewsPaperPublication>,
  ) {}

    //////////NewspaperPublication pipes/////////////
    // CREATE
    async create(createDto: NewsPaperPublicationDto) {
    const share_holding_information = this.NewspaperPublicationRepo.create(createDto);
    const data = await this.NewspaperPublicationRepo.save(share_holding_information);

    return {
        statusCode: HttpStatus.CREATED,
        message: 'NewspaperPublication created successfully',
        data,
    };
    }

    // GET ALL
    async findAll() {
        const data = await this.NewspaperPublicationRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'NewspaperPublication fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const share_holding_information = await this.NewspaperPublicationRepo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`NewspaperPublication with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: 'NewspaperPublication fetched successfully',
        data: share_holding_information,
        };
    }

    // UPDATE
    async update(id: number, updateDto: NewsPaperPublicationDto) {
        const entity = await this.NewspaperPublicationRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`NewspaperPublication with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.NewspaperPublicationRepo.save(entity);

        return {
            statusCode: HttpStatus.OK,
            message: 'NewspaperPublication pipes updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const share_holding_information = await this.NewspaperPublicationRepo.findOne({ where: { id } });
        if (!share_holding_information) {
        throw new NotFoundException(`NewspaperPublication with ID ${id} not found`);
        }

        await this.NewspaperPublicationRepo.remove(share_holding_information);

        return {
        statusCode: HttpStatus.OK,
        message: 'NewspaperPublication deleted successfully',
        };
    }
}
