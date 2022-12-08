import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { ThemeEntity } from './theme.entity';
import { AttachmentEntity } from '../../common/attachment-entity';

@Entity({ name: 'theme_attachment' })
export class ThemeAttachmentEntity extends AttachmentEntity {
  @OneToOne(() => ThemeEntity, (theme) => theme.attachment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  theme: ThemeEntity;
}
