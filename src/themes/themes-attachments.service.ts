import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeAttachmentEntity } from './entities/theme-attachment.entity';
import { EntityManager, Repository } from 'typeorm';
import { StoragesService } from '../storages/storages.service';
import { imageExtensionsRegex } from '../common/common.values';
import { FileType } from '../enums/file.type';

@Injectable()
export class ThemesAttachmentsService {
  constructor(
    @InjectRepository(ThemeAttachmentEntity)
    private readonly themeAttachmentRepository: Repository<ThemeAttachmentEntity>,
    private readonly storagesService: StoragesService,
  ) {}

  async create(
    transactionalEntityManager: EntityManager,
    image: Express.Multer.File,
  ): Promise<ThemeAttachmentEntity> {
    const uploadingResult = await this.storagesService.uploadFile(image);

    const themeAttachmentEntity = new ThemeAttachmentEntity();
    themeAttachmentEntity.s3Key = uploadingResult.key;
    themeAttachmentEntity.url = uploadingResult.location;
    themeAttachmentEntity.fileName = image.originalname;
    themeAttachmentEntity.type = imageExtensionsRegex.test(image.mimetype)
      ? FileType.IMAGE
      : FileType.FILE;
    themeAttachmentEntity.size = image.size;

    return await transactionalEntityManager.save(themeAttachmentEntity);
  }

  findAll() {
    return `This action returns all themesAttachments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} themesAttachment`;
  }

  // update(id: number, updateThemesAttachmentDto: UpdateThemesAttachmentDto) {
  //   return `This action updates a #${id} themesAttachment`;
  // }

  remove(id: number) {
    return `This action removes a #${id} themesAttachment`;
  }
}
