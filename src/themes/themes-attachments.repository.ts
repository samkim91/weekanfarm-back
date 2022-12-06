import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ThemeAttachmentEntity } from './entities/theme-attachment.entity';

@Injectable()
export class ThemesAttachmentsRepository extends Repository<ThemeAttachmentEntity> {}
