import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { FarmThemeEntity } from '../farms-themes/farm-theme.entity';
import { ThemeAttachmentEntity } from '../themes-attachments/theme-attachment.entity';
import { CommonEntity } from '../bases/common-entity';

@Entity({ name: 'theme' })
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
  )
  @JoinColumn()
  attachment: ThemeAttachmentEntity;
}
