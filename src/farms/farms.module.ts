import { Module } from '@nestjs/common';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';
import { FarmsRepository } from './farms.repository';

@Module({
  controllers: [FarmsController],
  providers: [FarmsService, FarmsRepository],
})
export class FarmsModule {}
