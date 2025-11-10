import { Injectable, NotFoundException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disclosure } from '../../../entity/disclosure.entity'
import { DisclosureDto } from '../../../dto/disclosure.dto';
import { DisclosureImages } from 'src/entity/disclosure_images.entity';
import { OtherDisclosure } from 'src/entity/other_disclosures.entity';
import { OtherDisclosureDto } from 'src/dto/other_disclosures.dto';

@Injectable()
export class DisclosuresService {
  constructor(
    @InjectRepository(Disclosure)
    private readonly DisclosuresRepo: Repository<Disclosure>,

    @InjectRepository(DisclosureImages)
    private readonly DisclosureImagesRepo: Repository<DisclosureImages>,

    @InjectRepository(OtherDisclosure)
    private readonly OtherDisclosureRepo: Repository<OtherDisclosure>,
  ) {}

    //////////Disclosures/////////////
    // CREATE
    async create(createDto: DisclosureDto) {
        const { name, images  } = createDto;

        const disclosure = this.DisclosuresRepo.create({ name });
        const savedDisclosure = await this.DisclosuresRepo.save(disclosure);

        if (images && images.length > 0) {
            const imageEntities = images.map((img) =>
            this.DisclosureImagesRepo.create({
                title: img.title,
                image: img.image,
                Disclosure: savedDisclosure, 
            }),
            );

            await this.DisclosureImagesRepo.save(imageEntities);
        }

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Disclosure created successfully',
            data: savedDisclosure,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.DisclosuresRepo.find({ relations: ['images'] });
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'All disclosures fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const disclosure_data = await this.DisclosuresRepo.findOne({
        where: { id },
        relations: ['images'],
        });
        if (!disclosure_data) {
            throw new NotFoundException({
                message: `Disclosures with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Disclosure data fetched successfully',
            data: disclosure_data,
        };
    }

    // UPDATE
    async update(id: number, updateDto: DisclosureDto) {
        const { name, images } = updateDto;

        const disclosure = await this.DisclosuresRepo.findOneBy({id});
        if(!disclosure){
            throw new NotFoundException({
                message: `Disclosures with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        disclosure.name= name;
        const savedDisclosure = await this.DisclosuresRepo.save(disclosure);
        if(images && images.length > 0){
            await this.DisclosureImagesRepo.delete({Disclosure:{id}});
            const imageTosave = images.map(img =>
                this.DisclosureImagesRepo.create({
                    title: img.title,
                    image: img.image,
                    Disclosure: savedDisclosure,
                })
            )           
            await this.DisclosureImagesRepo.save(imageTosave);
        }
        
        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Disclosure updated successfully',
            data: savedDisclosure,
        };
    }

    // DELETE
    async delete(id: number) {
        const disclosure_data = await this.DisclosuresRepo.findOne({ where: { id } });
        if (!disclosure_data) {
            throw new NotFoundException({
                message: `Disclosures with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.DisclosuresRepo.remove(disclosure_data);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Disclosure data deleted successfully',
        };
    }

    ///////////////// other disclosures /////////////// 
    // CREATE
    async createOtherClosure(createDto: OtherDisclosureDto) {
        try {
            const record = this.OtherDisclosureRepo.create(createDto);
            const data = await this.OtherDisclosureRepo.save(record);

            // console.log("record:", record);
            // console.log("data:", data);

            return {
                status: true,
                statusCode: HttpStatus.CREATED,
                message: 'Other disclosure created successfully',
                data,
            };
        } catch (error) {
            console.error('Error creating other disclosure:', error);
            throw new InternalServerErrorException(error.message);
        }
    }

    // GET ALL
    async findAllOtherClosures() {
        const data = await this.OtherDisclosureRepo.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Other disclosures data fetched successfully',
            data,
        };
    }

    // GET BY ID
    async findOtherClosureById(id: number) {
        const share_holding_information = await this.OtherDisclosureRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `Other disclosure with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Other disclosure fetched successfully',
            data: share_holding_information,
        };
    }

    // UPDATE
    async updateOtherClosure(id: number, updateDto: OtherDisclosureDto) {
        const entity = await this.OtherDisclosureRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException({
                message: `Other disclosure with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.OtherDisclosureRepo.save(entity);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Other disclosure updated successfully',
            data: updatedEntity,
        };
    }

    // DELETE
    async deleteOtherClosure(id: number) {
        const share_holding_information = await this.OtherDisclosureRepo.findOne({ where: { id } });
        if (!share_holding_information) {
            throw new NotFoundException({
                message: `Other disclosure with ID ${id} not found`,
                error: 'Not Found',
                statusCode: 404,
                status: false
            });
        }

        await this.OtherDisclosureRepo.remove(share_holding_information);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Other disclosure deleted successfully',
        };
    }
}
