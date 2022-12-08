import { Injectable } from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeEntity } from './entities/theme.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ThemesAttachmentsService } from './themes-attachments.service';
import { raw } from 'express';

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

  findAll() {
    return `This action returns all themes`;
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

    await this.themesRepository.update({ id: id }, themeEntity);

    return themeEntity;
  }

  async remove(id: number) {
    return await this.themesRepository.delete(id);
  }
}
