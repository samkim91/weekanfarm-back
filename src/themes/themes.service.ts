import { Injectable } from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeEntity } from './entities/theme.entity';
import { Repository } from 'typeorm';
import { ThemesAttachmentsService } from './themes-attachments.service';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(ThemeEntity)
    private readonly themesRepository: Repository<ThemeEntity>,
    private readonly themesAttachmentsService: ThemesAttachmentsService,
  ) {}

  async create(
    createThemeDto: CreateThemeDto,
    image: Express.Multer.File,
  ): Promise<ThemeEntity> {
    const themeEntity = this.themesRepository.create(createThemeDto);

    themeEntity.attachment = await this.themesAttachmentsService.create(image);

    return await this.themesRepository.save(themeEntity);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<ThemeEntity>> {
    return paginate(query, this.themesRepository, {
      relations: ['attachment'],
      sortableColumns: ['id', 'code', 'priority', 'isActive', 'name'],
      defaultSortBy: [['priority', 'ASC']],
      filterableColumns: {
        isActive: [FilterOperator.IN],
        code: [FilterOperator.ILIKE],
        name: [FilterOperator.ILIKE],
      },
    });
  }

  async findOne(id: number): Promise<ThemeEntity> {
    return await this.themesRepository.findOneOrFail({
      where: { id: id },
    });
  }

  async update(
    id: number,
    updateThemeDto: UpdateThemeDto,
    image: Express.Multer.File,
  ) {
    const themeEntity = this.themesRepository.create(updateThemeDto);

    if (image) {
      themeEntity.attachment = await this.themesAttachmentsService.update(
        themeEntity.attachment.id,
        image,
      );
    }

    return await this.themesRepository.update({ id: id }, themeEntity);
  }

  async remove(id: number) {
    const themeEntity = await this.findOne(id);

    if (themeEntity) {
      await this.themesAttachmentsService.remove(themeEntity.attachment.id);
      return await this.themesRepository.delete(id);
    }
  }
}
