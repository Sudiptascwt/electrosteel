import { IsString} from 'class-validator';

export class FraudAlertDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}