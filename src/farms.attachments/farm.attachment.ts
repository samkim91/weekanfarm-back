import { Entity, ManyToOne } from 'typeorm';
import { Farm } from '../farms/farm';
import { AttachmentEntity } from '../bases/attachment.entity';

@Entity()
export class FarmAttachment extends AttachmentEntity {
  @ManyToOne(() => Farm, (farm) => farm.attachments)
  farm: Farm;
}
