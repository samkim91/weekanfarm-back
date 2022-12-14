import { Module } from '@nestjs/common';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';
import { FarmsAttachmentsService } from './farms-attachments.service';
import { StoragesModule } from '../storages/storages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmEntity } from './entities/farm.entity';
import { FarmAttachmentEntity } from './entities/farm-attachment.entity';
import { ThemesModule } from '../themes/themes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FarmEntity, FarmAttachmentEntity]),
    StoragesModule,
    ThemesModule,
  ],
  controllers: [FarmsController],
  providers: [FarmsService, FarmsAttachmentsService],
})
export class FarmsModule {}
