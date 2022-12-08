import { Injectable } from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
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
  ): Promise<ThemeEntity> {
    // const themeEntity = plainToInstance(ThemeEntity, createThemeDto);
    const themeEntity = this.themesRepository.create(createThemeDto);

    await this.themesRepository.manager.transaction(
      async (transactionalEntityManager) => {
        themeEntity.attachment = await this.themesAttachmentsService.create(
          transactionalEntityManager,
          image,
        );
        await transactionalEntityManager.save(themeEntity);
      },
    );

    return themeEntity;
  }

  findAll() {
    return `This action returns all themes`;
  }

  async findOne(id: number): Promise<ThemeEntity> {
    return await this.themesRepository.findOneOrFail({
      where: { id: id },
      relations: { attachment: true },
    });
  }

  async update(
    id: number,
    updateThemeDto: UpdateThemeDto,
    image: Express.Multer.File,
  ) {
    const themeEntity = plainToInstance(ThemeEntity, updateThemeDto);

    const result = await this.themesRepository.update({ id: id }, themeEntity);

    const resultRow = result && result.affected! > 0;
    return resultRow;
  }

  remove(id: number) {
    return `This action removes a #${id} theme`;
  }
}
