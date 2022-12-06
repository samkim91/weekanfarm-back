import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { ThemesAttachmentsService } from './themes-attachments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeEntity } from './entities/theme.entity';
import { ThemeAttachmentEntity } from './entities/theme-attachment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ThemeEntity, ThemeAttachmentEntity])],
  controllers: [ThemesController],
  providers: [ThemesService, ThemesAttachmentsService],
})
export class ThemesModule {}
