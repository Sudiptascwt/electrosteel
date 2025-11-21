import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllCertificate } from '../../entity/all_certificates.entity';
import { AllCertificatesDto } from 'src/dto/all_certificates.dto';
import { Policies } from 'src/entity/policies.entity';
import { PoliciesDto } from 'src/dto/policies.dto';
import { CertificateTypeEnum } from '../../constants/certificate-type.enum';

@Injectable()
export class QualityFeaturesService {
    constructor(
        @InjectRepository(AllCertificate)
        private readonly QualityCertificatesRepository: Repository<AllCertificate>,
    ) {}

    // CREATE
    async create(createDto: AllCertificatesDto) {
        const newOffice = this.QualityCertificatesRepository.create(createDto);
        const savedOffice = await this.QualityCertificatesRepository.save(newOffice);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Quality certificate created successfully',
            data: savedOffice,
        };
    }

    // GET ALL
    async findAll() {
        const data = await this.QualityCertificatesRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Quality certificate fetched successfully' : 'No Quality certificate found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const office = await this.QualityCertificatesRepository.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Quality certificate with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Quality certificate fetched successfully',
            data: office,
        };
    }

    // UPDATE
    async update(id: number, updateDto: AllCertificatesDto) {
        const office = await this.QualityCertificatesRepository.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Quality certificate with ID ${id} not found`,
            });
        }

        Object.assign(office, updateDto);
        const updatedOffice = await this.QualityCertificatesRepository.save(office);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Quality certificate updated successfully',
            data: updatedOffice,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.QualityCertificatesRepository.delete(id);
        if (result.affected == 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Quality certificate with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Quality certificate deleted successfully'
        };
    }

    //getCertificateType
    async getCertificateType(type: CertificateTypeEnum): Promise<any> { 
        const certifictaes = await this.QualityCertificatesRepository.find({ where: { type } });
        return {
            status: true,
            statusCode: HttpStatus.OK,
            data: certifictaes,
            message: `${type} certificates fetched successfully.`
        }
    }


    ////////////// policy pdf //////////////
    
    async createPolicyPdf(createDto: PoliciesDto) {
        const newOffice = this.QualityCertificatesRepository.create(createDto);
        const savedOffice = await this.QualityCertificatesRepository.save(newOffice);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Quality policy created successfully',
            data: savedOffice,
        };
    }
        // GET ALL
    async findAllPolicies() {
        const data = await this.QualityCertificatesRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'All Quality policies fetched successfully' : 'No Quality policy found',
            data,
        };
    }

    // GET BY ID
    async findPolicyById(id: number) {
        const office = await this.QualityCertificatesRepository.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Quality policy with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Quality policy fetched successfully',
            data: office,
        };
    }

    // UPDATE
    async updatePolicy(id: number, updateDto: PoliciesDto) {
        const office = await this.QualityCertificatesRepository.findOne({ where: { id } });
        if (!office) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Quality policy with ID ${id} not found`,
            });
        }

        Object.assign(office, updateDto);
        const updatedOffice = await this.QualityCertificatesRepository.save(office);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Quality policy updated successfully',
            data: updatedOffice,
        };
    }

    // DELETE
    async deletePolicy(id: number) {
        const result = await this.QualityCertificatesRepository.delete(id);
        if (result.affected == 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Quality policy with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Quality policy deleted successfully'
        };
    }
}
