import { Entity, ManyToOne } from 'typeorm';
import { ThemeEntity } from '../themes/theme.entity';
import { FarmEntity } from '../farms/farm.entity';
import { CommonEntity } from '../bases/common-entity';

@Entity({ name: 'farm_theme' })
export class FarmThemeEntity extends CommonEntity {
  @ManyToOne(() => ThemeEntity, (theme) => theme.farmThemes)
  theme: ThemeEntity;

  @ManyToOne(() => FarmEntity, (farm) => farm.farmThemes)
  farm: FarmEntity;
}
