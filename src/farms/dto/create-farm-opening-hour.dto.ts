import { DayOfWeek } from '../../enums/day.of.week';
import { IsNotEmpty, Matches } from 'class-validator';
import { TIME_FORMAT_REGEX } from '../../utils/regex';

export class CreateFarmOpeningHourDto {
  @IsNotEmpty()
  dayOfWeek: DayOfWeek;

  @IsNotEmpty()
  @Matches(TIME_FORMAT_REGEX)
  startTime: string;

  @IsNotEmpty()
  @Matches(TIME_FORMAT_REGEX)
  endTime: string;
}
