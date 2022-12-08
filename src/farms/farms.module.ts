import { Module } from '@nestjs/common';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';
import { FarmsAttachmentService } from './farms-attachment.service';
import { StoragesModule } from '../storages/storages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmEntity } from './entities/farm.entity';
import { FarmAttachmentEntity } from './entities/farm-attachment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FarmEntity, FarmAttachmentEntity]),
    StoragesModule,
  ],
  controllers: [FarmsController],
  providers: [FarmsService, FarmsAttachmentService],
})
export class FarmsModule {}
