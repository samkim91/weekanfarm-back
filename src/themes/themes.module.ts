import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { ThemesAttachmentsService } from './themes-attachments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeEntity } from './entities/theme.entity';
import { ThemeAttachmentEntity } from './entities/theme-attachment.entity';
import { StoragesModule } from '../storages/storages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ThemeEntity, ThemeAttachmentEntity]),
    StoragesModule,
  ],
  controllers: [ThemesController],
  providers: [ThemesService, ThemesAttachmentsService],
  exports: [ThemesService],
})
export class ThemesModule {}
