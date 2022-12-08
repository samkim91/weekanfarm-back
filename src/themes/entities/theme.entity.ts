import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { FarmThemeEntity } from '../../farms-themes/farm-theme.entity';
import { ThemeAttachmentEntity } from './theme-attachment.entity';
import { CommonEntity } from '../../common/common-entity';
import { Type } from 'class-transformer';

@Entity({ name: 'theme' })
@Index(['code'], { unique: true })
export class ThemeEntity extends CommonEntity {
  @Column({ length: 128 })
  name: string;

  @Column({ length: 128 })
  code: string;

  @Column({ default: 0 })
  priority: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => FarmThemeEntity, (farmTheme) => farmTheme.theme)
  farmThemes: FarmThemeEntity[];

  @OneToOne(
    () => ThemeAttachmentEntity,
    (themeAttachment) => themeAttachment.theme,
    { cascade: true, eager: true },
  )
  @Type(() => ThemeAttachmentEntity)
  attachment: ThemeAttachmentEntity;
}
