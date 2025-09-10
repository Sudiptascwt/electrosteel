import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsrKey } from '../../../entity/csr_key.entity';
import { CsrKeyService } from './csr_key.service';
import { CsrKeyController } from './csr_key.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CsrKey])],
    controllers: [CsrKeyController],
    providers: [CsrKeyService],
})
export class CsrKeyModule {}
