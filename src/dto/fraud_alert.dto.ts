import { IsEnum, IsOptional, IsString} from 'class-validator';

export class FraudAlertDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}