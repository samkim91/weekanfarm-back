import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateThemeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @Matches(/^[A-Z]*$/, {
    message: '테마 코드는 영어(대문자)만 가능합니다.',
  })
  code: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  priority: number;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isActive: boolean;
}
