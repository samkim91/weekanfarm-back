import { Module } from '@nestjs/common';
import { FarmsController } from './farms.controller';
import { FarmsService } from './services/farms.service';
import { FarmsAttachmentsService } from './services/farms-attachments.service';
import { StoragesModule } from '../storages/storages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmEntity } from './entities/farm.entity';
import { FarmAttachmentEntity } from './entities/farm-attachment.entity';
import { ThemesModule } from '../themes/themes.module';
import { FarmsUrlsService } from './services/farms-urls.service';
import { FarmUrlEntity } from './entities/farm-url.entity';
import { FarmOpeningHourEntity } from './entities/farm-opening-hour.entity';
import { FarmsOpeningHoursService } from './services/farms-opening-hours.service';
import { FarmPricingEntity } from './entities/farm-pricing.entity';
import { FarmsPricingsService } from './services/farms-pricings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FarmEntity,
      FarmAttachmentEntity,
      FarmUrlEntity,
      FarmOpeningHourEntity,
      FarmPricingEntity,
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
    FarmsPricingsService,
  ],
})
export class FarmsModule {}
