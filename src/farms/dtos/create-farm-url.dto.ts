import { SnsType } from '../../enums/sns.type';
import { IsNotEmpty, Matches, MaxLength } from 'class-validator';
import { URL_REGEX } from '../../utils/regex';

export class CreateFarmUrlDto {
  @IsNotEmpty()
  @MaxLength(2100)
  @Matches(URL_REGEX)
  address: string;

  @IsNotEmpty()
  type: SnsType;
}
