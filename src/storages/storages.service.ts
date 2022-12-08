import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UploadStorageResponse } from './upload.storage.response';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { s3 } from './s3-initialize';

@Injectable()
export class StoragesService {
  constructor(private readonly configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File): Promise<UploadStorageResponse> {
    try {
      const result = await s3
        .upload({
          Bucket: this.configService.get('AWS_S3_BUCKET_NAME')!,
          Body: file.buffer,
          Key: `${uuid()}-${file.originalname}`,
          ACL: this.configService.get('AWS_S3_ACL'),
        })
        .promise();

      return { key: result.Key, location: result.Location };
    } catch (e) {
      console.log(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async deleteFile(key: string) {
    try {
      await s3
        .deleteObject({
          Bucket: this.configService.get('AWS_S3_BUCKET_NAME')!,
          Key: key,
        })
        .promise();
    } catch (e) {
      console.log(e.message);
      throw new InternalServerErrorException(
        'AWS connection error: ' + e.message,
      );
    }
  }
}
