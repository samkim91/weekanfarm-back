import { CommonEntity } from './common-entity';
import { Column } from 'typeorm';

export abstract class AttachmentEntity extends CommonEntity {
  @Column({ length: 64 })
  s3Key: string;

  @Column({ length: 2100 })
  url: string;

  @Column({ length: 256 })
  fileName: string;

  @Column()
  type: string;

  @Column({ default: 0 })
  size: number;
}
