import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ThemesService } from './services/themes.service';
import { CreateThemeDto } from './dtos/create-theme.dto';
import { UpdateThemeDto } from './dtos/update-theme.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ThemeEntity } from './entities/theme.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body()
    createThemeDto: CreateThemeDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        // validators: [
        //   new FileTypeValidator({ fileType: IMAGE_EXTENSIONS_REGEX }),
        // ],
      }),
    )
    image: Express.Multer.File,
  ): Promise<ThemeEntity> {
    return this.themesService.create(createThemeDto, image);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<ThemeEntity>> {
    return this.themesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ThemeEntity> {
    return this.themesService.findOne(+id);
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body()
    updateThemeDto: UpdateThemeDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        // validators: [
        //   new FileTypeValidator({ fileType: IMAGE_EXTENSIONS_REGEX }),
        // ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.themesService.update(+id, updateThemeDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.themesService.remove(+id);
  }
}
