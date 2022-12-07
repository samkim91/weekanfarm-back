import { Injectable } from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { ReadThemeDto } from './dto/read-theme.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeEntity } from './entities/theme.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ThemesAttachmentsService } from './themes-attachments.service';

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
  ): Promise<ReadThemeDto> {
    const themeEntity = plainToInstance(ThemeEntity, createThemeDto);

    await this.themesRepository.manager.transaction(
      async (transactionalEntityManager) => {
        themeEntity.attachment = await this.themesAttachmentsService.create(
          transactionalEntityManager,
          image,
        );
        await transactionalEntityManager.save(themeEntity);
      },
    );

    return plainToInstance(ReadThemeDto, themeEntity);
  }

  findAll() {
    return `This action returns all themes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} theme`;
  }

  update(id: number, updateThemeDto: UpdateThemeDto) {
    return `This action updates a #${id} theme`;
  }

  remove(id: number) {
    return `This action removes a #${id} theme`;
  }
}