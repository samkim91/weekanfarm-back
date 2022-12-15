import { SnsType } from '../../enums/sns.type';
import { IsNotEmpty, Matches, MaxLength } from 'class-validator';

export class CreateFarmUrlDto {
  @IsNotEmpty()
  @MaxLength(2100)
  @Matches(/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
  address: string;

  @IsNotEmpty()
  type: SnsType;
}
