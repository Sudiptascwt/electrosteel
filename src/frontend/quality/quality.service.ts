import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllCertificate } from '../../entity/all_certificates.entity';

@Injectable()
export class QualityService {
    constructor(
        @InjectRepository(AllCertificate)
        private readonly QualityRepository: Repository<AllCertificate>,
    ) {}

    // ------------------- PIPE ART CRUD -------------------


    // GET ALL PIPE ARTS WITH DETAILS
    async findAll(type?: string) {
    const allowedTypes = ['system', 'product', 'bodies'] as const;

    if (type && allowedTypes.includes(type as any)) {
        return await this.QualityRepository.find({
        where: { type: type as (typeof allowedTypes)[number] },
        });
    }

    return await this.QualityRepository.find();
    }



    // GET PIPE ART BY ID WITH DETAILS
    // async findById(id: number) {
    //     const Quality = await this.QualityRepository.findOne({
    //         where: { id },
    //         relations: ['details'], 
    //     });

    //     if (!Quality) {
    //         throw new NotFoundException({
    //             status: false,
    //             statusCode: HttpStatus.NOT_FOUND,
    //             message: `Quality with ID ${id} not found`,
    //         });
    //     }

    //     return {
    //         status: true,
    //         statusCode: HttpStatus.OK,
    //         message: 'Quality fetched successfully',
    //         data: Quality,
    //     };
    // }
}
