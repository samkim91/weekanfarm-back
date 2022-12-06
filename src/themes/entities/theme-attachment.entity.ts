import { Entity, OneToOne } from 'typeorm';
import { ThemeEntity } from './theme.entity';
import { AttachmentEntity } from '../../bases/attachment-entity';

@Entity({ name: 'theme_attachment' })
export class ThemeAttachmentEntity extends AttachmentEntity {
  @OneToOne(() => ThemeEntity, (theme) => theme.attachment)
  theme: ThemeEntity;
}
