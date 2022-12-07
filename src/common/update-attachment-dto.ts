import { FileType } from '../enums/file.type';

export class UpdateAttachmentDto {
  id: number;
  s3Key: string;
  url: string;
  fileName: string;
  type: FileType;
  size: number;
}
