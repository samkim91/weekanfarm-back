import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { ReadThemeDto } from './dto/read-theme.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeEntity } from './entities/theme.entity';
import { Repository } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(ThemeEntity)
    private readonly themesRepository: Repository<ThemeEntity>,
  ) {}

  async create(
    createThemeDto: CreateThemeDto,
    image: Express.Multer.File,
  ): Promise<ReadThemeDto> {
    const themeEntity = plainToInstance(ThemeEntity, createThemeDto);

    await this.themesRepository.save(themeEntity);

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
