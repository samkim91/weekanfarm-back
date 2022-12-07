import { Module } from '@nestjs/common';
import { StoragesService } from './storages.service';
import { StoragesController } from './storages.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [StoragesController],
  providers: [StoragesService],
  exports: [StoragesService],
})
export class StoragesModule {}
