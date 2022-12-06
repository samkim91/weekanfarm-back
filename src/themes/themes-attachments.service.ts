import { Injectable } from '@nestjs/common';
import { ThemesAttachmentsRepository } from './themes-attachments.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeAttachmentEntity } from './entities/theme-attachment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThemesAttachmentsService {
  constructor(
    @InjectRepository(ThemeAttachmentEntity)
    private readonly themeAttachmentRepository: Repository<ThemeAttachmentEntity>,
  ) {}

  // create(createThemesAttachmentDto: CreateThemesAttachmentDto) {
  //   return 'This action adds a new themesAttachment';
  // }

  findAll() {
    return `This action returns all themesAttachments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} themesAttachment`;
  }

  // update(id: number, updateThemesAttachmentDto: UpdateThemesAttachmentDto) {
  //   return `This action updates a #${id} themesAttachment`;
  // }

  remove(id: number) {
    return `This action removes a #${id} themesAttachment`;
  }
}
