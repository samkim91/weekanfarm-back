import { Injectable } from '@nestjs/common';
import { CreateFarmOpeningHourDto } from '../dtos/create-farm-opening-hour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmOpeningHourEntity } from '../entities/farm-opening-hour.entity';
import { Repository } from 'typeorm';
import { FarmEntity } from '../entities/farm.entity';

@Injectable()
export class FarmsOpeningHoursService {
  constructor(
    @InjectRepository(FarmOpeningHourEntity)
    private readonly farmOpeningHourRepository: Repository<FarmOpeningHourEntity>,
  ) {}
  async create(
    createFarmOpeningHourDtos: CreateFarmOpeningHourDto[],
  ): Promise<FarmOpeningHourEntity[]> {
    if (
      Array.isArray(createFarmOpeningHourDtos) &&
      createFarmOpeningHourDtos.length != 0
    ) {
      return Promise.all(
        this.farmOpeningHourRepository.create(createFarmOpeningHourDtos),
      );
    } else {
      return Promise.all([]);
    }
  }
  async update(
    farmEntity: FarmEntity,
    updateFarmOpeningHourDtos: CreateFarmOpeningHourDto[] | undefined,
  ): Promise<FarmOpeningHourEntity[]> {
    if (
      Array.isArray(updateFarmOpeningHourDtos) &&
      updateFarmOpeningHourDtos.length != 0
    ) {
      await this.farmOpeningHourRepository.delete({ farm: farmEntity });

      return await this.create(updateFarmOpeningHourDtos);
    } else {
      return Promise.all([]);
    }
  }
}
