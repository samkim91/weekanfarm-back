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

  // farm themes
  @OneToMany(() => FarmThemeEntity, (farmTheme) => farmTheme.theme)
  farmThemes: FarmThemeEntity[];

  // themes attachment
  @OneToOne(
    () => ThemeAttachmentEntity,
    (themeAttachment) => themeAttachment.theme,
    { cascade: true },
  )
  @JoinColumn()
  attachment: ThemeAttachmentEntity;
}
