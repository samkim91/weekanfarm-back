import { PartialType } from '@nestjs/mapped-types';
import { CreateThemeDto } from './create-theme.dto';
import { UpdateAttachmentDto } from '../../common/update-attachment-dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateThemeDto extends PartialType(CreateThemeDto) {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsNotEmpty()
  @Type(() => UpdateAttachmentDto)
  attachment: UpdateAttachmentDto;
}
