import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  Unique,
} from 'typeorm';
import { FarmThemeEntity } from '../../farms-themes/farm-theme.entity';
import { ThemeAttachmentEntity } from './theme-attachment.entity';
import { CommonEntity } from '../../common/common-entity';
import { Exclude, Expose, Type } from 'class-transformer';

@Entity({ name: 'theme' })
@Index(['code'], { unique: true })
export class ThemeEntity extends CommonEntity {
  @Column({ length: 128 })
  @Expose()
  name: string;

  @Column({ length: 128 })
  @Expose()
  code: string;

  @Column({ default: 0 })
  @Expose()
  priority: number;

  @Column({ default: true })
  @Expose()
  isActive: boolean;

  // farm themes
  @OneToMany(() => FarmThemeEntity, (farmTheme) => farmTheme.theme)
  @Exclude()
  farmThemes: FarmThemeEntity[];

  // themes attachment
  @OneToOne(
    () => ThemeAttachmentEntity,
    (themeAttachment) => themeAttachment.theme,
    { cascade: true },
  )
  @Expose()
  @JoinColumn()
  @Type(() => ThemeAttachmentEntity)
  attachment: ThemeAttachmentEntity;
}
