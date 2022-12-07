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

  update(
    transactionalEntityManager: EntityManager,
    id: number,
    image: Express.Multer.File,
  ) {
    // todo : image 가 not null 이면, S3 에서 삭제, DB에서 이미지 데이터 삭제, 새로운 이미지 s3 업로드, 새로운 이미지 데이터 DB 삽입
    // todo : 아니면 그냥 리턴

    return `This action updates a #${id} themesAttachment`;
  }

  remove(id: number) {
    return `This action removes a #${id} themesAttachment`;
  }
}
