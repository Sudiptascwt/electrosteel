import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsrKey } from '../../../entity/csr_key.entity';
import { CsrKeyService } from './csr.service';
import { CsrKeyController } from './csr.controller';
import { CsrOverview } from 'src/entity/csr_overview.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CsrKey, CsrOverview])],
    controllers: [CsrKeyController],
    providers: [CsrKeyService],
})
export class CsrKeyModule {}
