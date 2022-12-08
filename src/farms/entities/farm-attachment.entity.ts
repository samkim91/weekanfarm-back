import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { FarmEntity } from './farm.entity';
import { AttachmentEntity } from '../../common/attachment-entity';

@Entity({ name: 'farm_attachment' })
export class FarmAttachmentEntity extends AttachmentEntity {
  @ManyToOne(() => FarmEntity, (farm) => farm.attachments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  farm: FarmEntity;
}
