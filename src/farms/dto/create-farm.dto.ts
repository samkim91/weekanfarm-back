import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  Matches,
  MaxLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { EMAIL_REGEX } from '../../utils/regex';
import { ThemeEntity } from '../../themes/entities/theme.entity';

export class CreateFarmDto {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @MaxLength(16)
  mainPhone: string;

  @MaxLength(16)
  alternatePhone = '';

  @IsNotEmpty()
  @MaxLength(100)
  address: string;

  @MaxLength(100)
  detailAddress = '';

  @MaxLength(65535)
  directions = '';

  @MaxLength(64)
  @Matches(EMAIL_REGEX)
  email = '';

  @MaxLength(65535)
  ownerNotes = '';

  @MaxLength(2000)
  hashTags = '';

  @MaxLength(65535)
  conveniences = '';

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isReservationCancelable: boolean;

  @MaxLength(65535)
  refundPolicy = '';

  @MaxLength(65535)
  adminNotes = '';
  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isActive: boolean;

  @IsArray()
  @Type(() => ThemeEntity)
  themes: ThemeEntity[];

  // TODO: 2022/12/13 openingHours

  // TODO: 2022/12/13 pricing

  // TODO: 2022/12/13 urls
}
