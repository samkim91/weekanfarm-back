import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeAttachmentEntity } from '../entities/theme-attachment.entity';
import { Repository } from 'typeorm';
import { StoragesService } from '../../storages/storages.service';
import { FileType } from '../../enums/file.type';
import { IMAGE_EXTENSIONS_REGEX } from '../../utils/regex';

@Injectable()
export class ThemesAttachmentsService {
  constructor(
    @InjectRepository(ThemeAttachmentEntity)
    private readonly themeAttachmentRepository: Repository<ThemeAttachmentEntity>,
    private readonly storagesService: StoragesService,
  ) {}

  async create(image: Express.Multer.File): Promise<ThemeAttachmentEntity> {
    const uploadingResult = await this.storagesService.uploadFile(image);

    return this.themeAttachmentRepository.create({
      s3Key: uploadingResult.key,
      url: uploadingResult.location,
      fileName: image.originalname,
      type: IMAGE_EXTENSIONS_REGEX.test(image.mimetype)
        ? FileType.IMAGE
        : FileType.FILE,
      size: image.size,
    });
  }

  async findOne(id: number) {
    return await this.themeAttachmentRepository.findOneBy({ id: id });
  }

  async update(
    id: number,
    image: Express.Multer.File,
  ): Promise<ThemeAttachmentEntity> {
    await this.remove(id);
    return await this.create(image);
  }

  async remove(id: number) {
    const themeAttachmentEntity = await this.findOne(id);

    if (themeAttachmentEntity) {
      await this.storagesService.deleteFile(themeAttachmentEntity.s3Key);
      await this.themeAttachmentRepository.remove(themeAttachmentEntity);
    }
  }
}
