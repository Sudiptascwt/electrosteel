import { IsNotEmpty, IsString } from 'class-validator';

export class OtherDisclosureDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    pdf: string;
}
