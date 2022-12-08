import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmEntity } from './entities/farm.entity';
import { Repository } from 'typeorm';
import { CreateFarmDto } from './dto/create-farm.dto';
import { FarmsAttachmentService } from './farms-attachment.service';
import { UpdateFarmDto } from './dto/update-farm.dto';

@Injectable()
export class FarmsService {
  private readonly logger = new Logger(FarmsService.name);

  constructor(
    @InjectRepository(FarmEntity)
    private readonly farmsRepository: Repository<FarmEntity>,
    private readonly farmsAttachmentService: FarmsAttachmentService,
  ) {}

  async create(
    createFarmDto: CreateFarmDto,
    images: Express.Multer.File[],
  ): Promise<FarmEntity> {
    const farmEntity = this.farmsRepository.create(createFarmDto);

    // TODO themes, urls, opening-hours, pricings 추가 필요
    if (Array.isArray(images) && images.length != 0) {
      // TODO attachments create
    }

    return await this.farmsRepository.save(farmEntity);
  }

  // async findAll(query: PaginateQuery) {}
  async findOne(id: number) {
    return await this.farmsRepository.findOneOrFail({
      where: { id: id },
    });
  }

  async update(
    id: number,
    updateFarmDto: UpdateFarmDto,
    images: Express.Multer.File[],
  ) {
    const farmEntity = this.farmsRepository.create(updateFarmDto);

    if (Array.isArray(images) && images.length != 0) {
      // TODO attachments update
    }

    // TODO themes, urls, openingHours, pricings 업데이트

    return await this.farmsRepository.update({ id: id }, farmEntity);
  }

  async remove(id: number) {
    return await this.farmsRepository.delete(id);
  }
}
