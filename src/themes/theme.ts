import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { FarmTheme } from '../farms.themes/farm.theme';
import { ThemeAttachment } from '../themes.attachments/theme.attachment';
import { CommonEntity } from '../bases/common.entity';

@Entity()
export class Theme extends CommonEntity {
  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ default: 0 })
  priority: number;

  @Column()
  isActive: boolean;

  // farm themes
  @OneToMany(() => FarmTheme, (farmTheme) => farmTheme.theme)
  farmThemes: FarmTheme[];

  // themes attachment
  @OneToOne(() => ThemeAttachment, (themeAttachment) => themeAttachment.theme)
  @JoinColumn()
  attachment: ThemeAttachment;
}
