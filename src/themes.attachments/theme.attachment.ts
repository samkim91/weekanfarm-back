import { Entity, OneToOne } from 'typeorm';
import { Theme } from '../themes/theme';
import { AttachmentEntity } from '../bases/attachment.entity';

@Entity()
export class ThemeAttachment extends AttachmentEntity {
  @OneToOne(() => Theme, (theme) => theme.attachment)
  theme: Theme;
}
