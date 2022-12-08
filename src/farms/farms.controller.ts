import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FarmsService } from './farms.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFarmDto } from './dto/create-farm.dto';
import { FarmEntity } from './entities/farm.entity';
import { IMAGE_EXTENSIONS_REGEX } from '../utils/regex';
import { UpdateFarmDto } from './dto/update-farm.dto';

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('images'))
  create(
    @Body(new ValidationPipe({ transform: true }))
    createFarmDto: CreateFarmDto,
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new FileTypeValidator({ fileType: IMAGE_EXTENSIONS_REGEX }),
        ],
      }),
    )
    images: Express.Multer.File[],
  ): Promise<FarmEntity> {
    return this.farmsService.create(createFarmDto, images);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FarmEntity> {
    return this.farmsService.findOne(+id);
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('images'))
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateFarmDto: UpdateFarmDto,
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new FileTypeValidator({ fileType: IMAGE_EXTENSIONS_REGEX }),
        ],
      }),
    )
    images: Express.Multer.File[],
  ) {
    return this.farmsService.update(+id, updateFarmDto, images);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmsService.remove(+id);
  }
}
