import { FileType } from '../enums/file.type';

export class ReadAttachmentDto {
  s3FileName: string;
  url: string;
  name: string;
  type: FileType;
  size: number;
}
