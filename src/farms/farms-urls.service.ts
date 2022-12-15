import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FarmUrlEntity } from './entities/farm-url.entity';
import { CreateFarmUrlDto } from './dto/create-farm-url.dto';
import { FarmEntity } from './entities/farm.entity';

@Injectable()
export class FarmsUrlsService {
  constructor(
    @InjectRepository(FarmUrlEntity)
    private readonly farmUrlRepository: Repository<FarmUrlEntity>,
  ) {}

  async create(
    createFarmUrlDtos: CreateFarmUrlDto[],
  ): Promise<FarmUrlEntity[]> {
    if (Array.isArray(createFarmUrlDtos) && createFarmUrlDtos.length != 0) {
      return Promise.all(this.farmUrlRepository.create(createFarmUrlDtos));
    } else {
      return Promise.all([]);
    }
  }

  async update(
    farmEntity: FarmEntity,
    updateFarmUrlDtos: CreateFarmUrlDto[] | undefined,
  ): Promise<FarmUrlEntity[]> {
    if (Array.isArray(updateFarmUrlDtos) && updateFarmUrlDtos.length != 0) {
      await this.farmUrlRepository.delete({ farm: farmEntity });

      return await this.create(updateFarmUrlDtos);
    } else {
      return Promise.all([]);
    }
  }
}
