import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmAttachmentEntity } from './entities/farm-attachment.entity';
import { Repository } from 'typeorm';
import { StoragesService } from '../storages/storages.service';

@Injectable()
export class FarmsAttachmentService {
  constructor(
    @InjectRepository(FarmAttachmentEntity)
    private readonly farmAttachmentRepository: Repository<FarmAttachmentEntity>,
    private readonly storagesService: StoragesService,
  ) {}

  async create() {}
  async findOne(id: number) {}
  async update() {}
  async remove(id: number) {}
}
