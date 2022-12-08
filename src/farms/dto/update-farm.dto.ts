import { PartialType } from '@nestjs/mapped-types';
import { CreateFarmDto } from './create-farm.dto';
import { Type } from 'class-transformer';
import { UpdateAttachmentDto } from '../../common/update-attachment-dto';

export class UpdateFarmDto extends PartialType(CreateFarmDto) {
  @Type(() => UpdateAttachmentDto)
  attachments: UpdateAttachmentDto[];
}
