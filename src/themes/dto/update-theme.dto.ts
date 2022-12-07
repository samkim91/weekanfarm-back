import { PartialType } from '@nestjs/mapped-types';
import { CreateThemeDto } from './create-theme.dto';
import { ReadAttachmentDto } from '../../common/read-attachment-dto';

export class UpdateThemeDto extends PartialType(CreateThemeDto) {
  attachment: ReadAttachmentDto;
}
