import { CommonEntity } from './common.entity';
import { Column } from 'typeorm';
import { FileType } from '../enums/file.type';

export abstract class AttachmentEntity extends CommonEntity {
  @Column({ length: 64 })
  s3FileName: string;

  @Column({ length: 2100 })
  url: string;

  @Column({ length: 256 })
  name: string;

  @Column()
  type: typeof FileType;

  @Column({ default: 0 })
  size: number;
}
