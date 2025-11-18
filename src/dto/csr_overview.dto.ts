import { IsNotEmpty, IsString } from 'class-validator';

export class CsrOverviewDto {
  @IsString()
  title_description: string;

  @IsString()
  csr_objective_description: string;

  @IsString()
  csr_objective_image: string;

  @IsString()
  csr_objective_image_id: number;

  @IsString()
  key_focus_area_image: string;

  @IsString()
  key_focus_area_image_id: number;

  @IsString()
  key_focus_area_description: string;
}
