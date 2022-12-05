import { Entity, ManyToOne } from 'typeorm';
import { FarmEntity } from '../farms/farm.entity';
import { AttachmentEntity } from '../bases/attachment-entity';

@Entity({ name: 'farm_attachment' })
export class FarmAttachmentEntity extends AttachmentEntity {
  @ManyToOne(() => FarmEntity, (farm) => farm.attachments)
  farm: FarmEntity;
}
