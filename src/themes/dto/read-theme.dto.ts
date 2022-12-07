import { PartialType } from '@nestjs/mapped-types';
import { CreateThemeDto } from './create-theme.dto';
import { ReadAttachmentDto } from '../../common/read-attachment-dto';

export class ReadThemeDto {
  id: number;
  name: string;
  code: string;
  priority: number;
  isActive: boolean;
  attachement: ReadAttachmentDto;
}
