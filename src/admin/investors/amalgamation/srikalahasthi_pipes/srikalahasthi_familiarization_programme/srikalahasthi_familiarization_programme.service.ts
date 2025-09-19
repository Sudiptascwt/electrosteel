import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrikalahasthiFamiliarizationProgramme } from '../../../../../entity/srikalahasthi_familiarization_programme.entity';
import { SrikalahasthiFamiliarizationProgrammeDto } from '../../../../../dto/srikalahasthi_familiarization_programme.dto';

@Injectable()
export class SrikalahasthiFamiliarizationProgrammeService {
  constructor(
    @InjectRepository(SrikalahasthiFamiliarizationProgramme)
    private readonly SrikalahasthiRepo: Repository<SrikalahasthiFamiliarizationProgramme>,
  ) {}

    //////////Srikalahasthi familiarization programme/////////////
    // CREATE
    async create(createDto: SrikalahasthiFamiliarizationProgrammeDto) {
        const office = this.SrikalahasthiRepo.create(createDto);
        const data = await this.SrikalahasthiRepo.save(office);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Srikalahasthi familiarization programme created successfully',
            data,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.SrikalahasthiRepo.find();
        return {
        statusCode: HttpStatus.OK,
        message: 'All Srikalahasthi familiarization programme fetched successfully',
        data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.SrikalahasthiRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Srikalahasthi familiarization programme with ID ${id} not found`);
        }
        return {
        statusCode: HttpStatus.OK,
        message: 'srikalahasthi pipe fetched successfully',
        data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: SrikalahasthiFamiliarizationProgrammeDto) {
        const entity = await this.SrikalahasthiRepo.findOneBy({ id });
        if (!entity) {
            throw new NotFoundException(`Srikalahasthi with id ${id} not found`);
        }

        Object.assign(entity, updateDto);

        const updatedEntity = await this.SrikalahasthiRepo.save(entity);

        return {
            statusCode: HttpStatus.OK,
            message: 'Srikalahasthi familiarization programme updated successfully',
            data: updatedEntity,
        };
    }


    // DELETE
    async delete(id: number) {
        const office = await this.SrikalahasthiRepo.findOne({ where: { id } });
        if (!office) {
        throw new NotFoundException(`Srikalahasthi familiarization programme with ID ${id} not found`);
        }

        await this.SrikalahasthiRepo.remove(office);

        return {
        statusCode: HttpStatus.OK,
        message: 'Srikalahasthi familiarization programme deleted successfully',
        };
    }
}
