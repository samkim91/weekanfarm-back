import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FarmsService } from './services/farms.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateFarmDto } from './dtos/create-farm.dto';
import { FarmEntity } from './entities/farm.entity';
import { UpdateFarmDto } from './dtos/update-farm.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  create(
    @Body(new ValidationPipe({ transform: true }))
    createFarmDto: CreateFarmDto,
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: false,
      }),
    )
    files: Express.Multer.File[],
  ): Promise<FarmEntity> {
    return this.farmsService.create(createFarmDto, files);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<FarmEntity>> {
    return this.farmsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FarmEntity> {
    return this.farmsService.findOne(+id);
  }

  @Post(':id')
  @UseInterceptors(FilesInterceptor('images'))
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateFarmDto: UpdateFarmDto,
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: false,
        // validators: [
        //   new FileTypeValidator({ fileType: IMAGE_EXTENSIONS_REGEX }),
        // ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    return this.farmsService.update(+id, updateFarmDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmsService.remove(+id);
  }
}
