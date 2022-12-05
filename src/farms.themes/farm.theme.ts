import { Entity, ManyToOne } from 'typeorm';
import { Theme } from '../themes/theme';
import { Farm } from '../farms/farm';
import { CommonEntity } from '../bases/common.entity';

@Entity()
export class FarmTheme extends CommonEntity {
  @ManyToOne(() => Theme, (theme) => theme.farmThemes)
  theme: Theme;

  @ManyToOne(() => Farm, (farm) => farm.farmThemes)
  farm: Farm;
}
