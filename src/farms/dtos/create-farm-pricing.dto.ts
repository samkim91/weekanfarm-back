import { IsNotEmpty, IsNumber, Matches, MaxLength } from 'class-validator';
import { TIME_FORMAT_REGEX } from '../../utils/regex';
import { Type } from 'class-transformer';

export class CreateFarmPricingDto {
  @IsNotEmpty()
  @MaxLength(256)
  eventName: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  cost: number;

  @Matches(TIME_FORMAT_REGEX)
  playtime = '00:00:00';
}
