import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmAttachmentEntity } from './entities/farm-attachment.entity';
import { In, IsNull, Not, Repository } from 'typeorm';
import { StoragesService } from '../storages/storages.service';
import { IMAGE_EXTENSIONS_REGEX } from '../utils/regex';
import { FileType } from '../enums/file.type';

@Injectable()
export class FarmsAttachmentService {
  constructor(
    @InjectRepository(FarmAttachmentEntity)
    private readonly farmAttachmentRepository: Repository<FarmAttachmentEntity>,
    private readonly storagesService: StoragesService,
  ) {}

  async create(files: Express.Multer.File[]): Promise<FarmAttachmentEntity[]> {
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
  }

  async findAll(ids: number[]): Promise<FarmAttachmentEntity[]> {
    return await this.farmAttachmentRepository.find({ where: { id: In(ids) } });
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

  async remove(farmId: number, leftAttachment: FarmAttachmentEntity[]) {
    const leftAttachmentIds = leftAttachment.map((attachment) => attachment.id);
    const deletingAttachments = await this.findAllByFarmAndIdNotIn(
      farmId,
      leftAttachmentIds,
    );
    const deletingAttachmentIds = deletingAttachments.map(
      (attachment) => attachment.id,
    );
    await this.removeAll(deletingAttachmentIds);
  }

  async removeAll(ids: number[]) {
    const farmAttachments = await this.findAll(ids);

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
