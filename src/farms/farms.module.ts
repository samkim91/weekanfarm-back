import { Module } from '@nestjs/common';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';
import { FarmsAttachmentsService } from './farms-attachments.service';
import { StoragesModule } from '../storages/storages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmEntity } from './entities/farm.entity';
import { FarmAttachmentEntity } from './entities/farm-attachment.entity';
import { ThemesModule } from '../themes/themes.module';
import { FarmsUrlsService } from './farms-urls.service';
import { FarmUrlEntity } from './entities/farm-url.entity';
import { FarmOpeningHourEntity } from './entities/farm-opening-hour.entity';
import { FarmsOpeningHoursService } from './farms-opening-hours.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FarmEntity,
      FarmAttachmentEntity,
      FarmUrlEntity,
      FarmOpeningHourEntity,
    ]),
    StoragesModule,
    ThemesModule,
  ],
  controllers: [FarmsController],
  providers: [
    FarmsService,
    FarmsAttachmentsService,
    FarmsUrlsService,
    FarmsOpeningHoursService,
  ],
})
export class FarmsModule {}
