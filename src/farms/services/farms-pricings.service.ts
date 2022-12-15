import { Injectable } from '@nestjs/common';
import { CreateFarmPricingDto } from '../dtos/create-farm-pricing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmPricingEntity } from '../entities/farm-pricing.entity';
import { Repository } from 'typeorm';
import { FarmEntity } from '../entities/farm.entity';

@Injectable()
export class FarmsPricingsService {
  constructor(
    @InjectRepository(FarmPricingEntity)
    private readonly farmPricingRepository: Repository<FarmPricingEntity>,
  ) {}

  async create(
    createFarmPricingDtos: CreateFarmPricingDto[],
  ): Promise<FarmPricingEntity[]> {
    if (
      Array.isArray(createFarmPricingDtos) &&
      createFarmPricingDtos.length != 0
    ) {
      return Promise.all(
        this.farmPricingRepository.create(createFarmPricingDtos),
      );
    } else {
      return Promise.all([]);
    }
  }

  async update(
    farmEntity: FarmEntity,
    updateFarmPricingDto: CreateFarmPricingDto[] | undefined,
  ): Promise<FarmPricingEntity[]> {
    if (
      Array.isArray(updateFarmPricingDto) &&
      updateFarmPricingDto.length != 0
    ) {
      await this.farmPricingRepository.delete({ farm: farmEntity });

      return await this.create(updateFarmPricingDto);
    } else {
      return Promise.all([]);
    }
  }
}
