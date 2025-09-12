import { IsNotEmpty, IsString } from 'class-validator';

export class CsrOverviewDto {
  @IsString()
  @IsNotEmpty()
  title_description: string;

  @IsString()
  @IsNotEmpty()
  csr_objective_description: string;

  @IsString()
  @IsNotEmpty()
  csr_objective_image: string;

  @IsString()
  @IsNotEmpty()
  key_focus_area_image: string;

  @IsString()
  @IsNotEmpty()
  key_focus_area_description: string;
}
