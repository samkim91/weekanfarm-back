import { PartialType } from '@nestjs/mapped-types';
import { CreateThemeDto } from './create-theme.dto';
import { UpdateAttachmentDto } from '../../common/update-attachment-dto';
import { Type } from 'class-transformer';

export class UpdateThemeDto extends PartialType(CreateThemeDto) {
  @Type(() => UpdateAttachmentDto)
  attachment: UpdateAttachmentDto;
}
