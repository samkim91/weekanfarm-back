export class UpdateAttachmentDto {
  id: number;
  s3Key: string;
  url: string;
  fileName: string;
  type: string;
  size: number;
}
