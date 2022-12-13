import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmAttachmentEntity } from './entities/farm-attachment.entity';
import { In, IsNull, Not, Repository } from 'typeorm';
import { StoragesService } from '../storages/storages.service';
import { IMAGE_EXTENSIONS_REGEX } from '../utils/regex';
import { FileType } from '../enums/file.type';
import { FarmEntity } from './entities/farm.entity';

@Injectable()
export class FarmsAttachmentService {
  constructor(
    @InjectRepository(FarmAttachmentEntity)
    private readonly farmAttachmentRepository: Repository<FarmAttachmentEntity>,
    private readonly storagesService: StoragesService,
  ) {}

  async create(files: Express.Multer.File[]): Promise<FarmAttachmentEntity[]> {
    if (Array.isArray(files) && files.length != 0) {
      return await Promise.all(
        files.map(async (file): Promise<FarmAttachmentEntity> => {
          const uploadingResult = await this.storagesService.uploadFile(file);

          return this.farmAttachmentRepository.create({
            s3Key: uploadingResult.key,
            url: uploadingResult.location,
            fileName: file.originalname,
            type: IMAGE_EXTENSIONS_REGEX.test(file.mimetype)
              ? FileType.IMAGE
              : FileType.FILE,
            size: file.size,
          });
        }),
      );
    } else {
      return await Promise.all([]);
    }
  }

  async update(
    farmEntity: FarmEntity,
    files: Express.Multer.File[],
  ): Promise<FarmAttachmentEntity[]> {
    const deletingAttachments = await this.filterDeletingAttachments(
      farmEntity.id,
      farmEntity.attachments,
    );

    await this.remove(deletingAttachments);

    return await this.create(files);
  }

  async filterDeletingAttachments(
    farmId: number,
    leftAttachment: FarmAttachmentEntity[],
  ) {
    const leftAttachmentIds = leftAttachment.map((attachment) => attachment.id);
    return await this.findAllByFarmAndIdNotIn(farmId, leftAttachmentIds);
  }

  async findAllByFarmAndIdNotIn(
    farmId: number,
    leftAttachmentIds: number[],
  ): Promise<FarmAttachmentEntity[]> {
    return await this.farmAttachmentRepository.find({
      relations: { farm: true },
      where: {
        farm: { id: farmId },
        id:
          leftAttachmentIds.length == 0
            ? Not(In(leftAttachmentIds))
            : Not(IsNull()),
      },
    });
  }

  async remove(farmAttachments: FarmAttachmentEntity[]) {
    if (Array.isArray(farmAttachments) && farmAttachments.length > 0) {
      await Promise.all(
        farmAttachments.map(async (farmAttachment) => {
          await this.storagesService.deleteFile(farmAttachment.s3Key);
          await this.farmAttachmentRepository.delete(farmAttachment);
        }),
      );
    }
  }
}
