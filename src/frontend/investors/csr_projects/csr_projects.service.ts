import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CsrProjects } from 'src/entity/csr_projects.entity';


@Injectable()
export class FrontendCsrProjectService {
  constructor(
    @InjectRepository(CsrProjects)
    private readonly CsrProjectRepo: Repository<CsrProjects>,
  ) {}

    async getCsrProjectData(start_date?: string, end_date?: string) {
        const where: any = {};
        const query = this.CsrProjectRepo.createQueryBuilder('csr');

        if (start_date && end_date) {
        query.where('csr.start_date >= :start_date AND csr.end_date <= :end_date', { start_date, end_date });
        }
        const projects = await query.getMany();

        return {
            statusCode: 200,
            message: projects.length
            ? 'CSR projects data fetched successfully'
            : 'No CSR projects data found for the given range',
            data: projects,
        };
    }

}