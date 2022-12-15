import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmEntity } from '../entities/farm.entity';
import { Repository } from 'typeorm';
import { CreateFarmDto } from '../dtos/create-farm.dto';
import { FarmsAttachmentsService } from './farms-attachments.service';
import { UpdateFarmDto } from '../dtos/update-farm.dto';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { ThemesService } from '../../themes/services/themes.service';
import { updateFarmEntity } from '../converters/update-farm-entity';
import { FarmsUrlsService } from './farms-urls.service';
import { FarmsOpeningHoursService } from './farms-opening-hours.service';
import { FarmsPricingsService } from './farms-pricings.service';

@Injectable()
export class FarmsService {
  private readonly logger = new Logger(FarmsService.name);

  constructor(
    @InjectRepository(FarmEntity)
    private readonly farmsRepository: Repository<FarmEntity>,
    private readonly farmsAttachmentsService: FarmsAttachmentsService,
    private readonly themesService: ThemesService,
    private readonly farmsUrlsService: FarmsUrlsService,
    private readonly farmsOpeningHoursService: FarmsOpeningHoursService,
    private readonly farmsPricingsService: FarmsPricingsService,
  ) {}

  async create(
    createFarmDto: CreateFarmDto,
    files: Express.Multer.File[],
  ): Promise<FarmEntity> {
    const farmEntity = this.farmsRepository.create(createFarmDto);

    farmEntity.attachments = await this.farmsAttachmentsService.create(files);

    farmEntity.themes = await this.themesService.updateFarmThemes(
      createFarmDto.themes,
    );

    farmEntity.urls = await this.farmsUrlsService.create(createFarmDto.urls);

    farmEntity.openingHours = await this.farmsOpeningHoursService.create(
      createFarmDto.openingHours,
    );

    farmEntity.pricings = await this.farmsPricingsService.create(
      createFarmDto.pricings,
    );

    return await this.farmsRepository.save(farmEntity);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<FarmEntity>> {
    return paginate(query, this.farmsRepository, {
      relations: ['themes', 'openingHours', 'pricings', 'attachments', 'urls'],
      sortableColumns: [
        'id',
        'name',
        'mainPhone',
        'isActive',
        'isReservationCancelable',
        'pricings.cost',
        'themes.code',
        'themes.name',
      ],
      defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.ILIKE],
        mainPhone: [FilterOperator.ILIKE],
        alternatePhone: [FilterOperator.ILIKE],
        address: [FilterOperator.ILIKE],
        directions: [FilterOperator.ILIKE],
        email: [FilterOperator.ILIKE],
        ownerNotes: [FilterOperator.ILIKE],
        hashTags: [FilterOperator.ILIKE],
        conveniences: [FilterOperator.ILIKE],
        isReservationCancelable: [FilterOperator.ILIKE],
        refundPolicy: [FilterOperator.ILIKE],
        adminNotes: [FilterOperator.ILIKE],
        isActive: [FilterOperator.IN],
        'themes.name': [FilterOperator.ILIKE],
        'themes.code': [FilterOperator.ILIKE],
        'pricings.cost': [FilterOperator.BTW],
      },
    });
  }

  async findOne(id: number) {
    return await this.farmsRepository.findOneOrFail({
      where: { id: id },
    });
  }

  async update(
    id: number,
    updateFarmDto: UpdateFarmDto,
    files: Express.Multer.File[],
  ) {
    const farmEntity = await this.findOne(id);
    updateFarmEntity(farmEntity, updateFarmDto);

    const newFarmAttachments = await this.farmsAttachmentsService.update(
      farmEntity,
      files,
    );
    farmEntity.attachments.push.apply(newFarmAttachments);

    farmEntity.themes = await this.themesService.updateFarmThemes(
      updateFarmDto.themes,
    );

    farmEntity.urls = await this.farmsUrlsService.update(
      farmEntity,
      updateFarmDto.urls,
    );

    farmEntity.openingHours = await this.farmsOpeningHoursService.update(
      farmEntity,
      updateFarmDto.openingHours,
    );

    farmEntity.pricings = await this.farmsPricingsService.update(
      farmEntity,
      updateFarmDto.pricings,
    );

    return await this.farmsRepository.save(farmEntity);
  }

  async remove(id: number) {
    const farmEntity = await this.findOne(id);

    if (farmEntity) {
      await this.farmsAttachmentsService.remove(farmEntity.attachments);
      return await this.farmsRepository.delete(id);
    }
  }
}
