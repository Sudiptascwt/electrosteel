import { IsString } from 'class-validator';

export class ExternalPipesDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    guiding_stadards: string;

    @IsString()
    url: string;

    @IsString()
    pdf: string;
}
