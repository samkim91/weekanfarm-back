import { Entity, ManyToOne } from 'typeorm';
import { ThemeEntity } from '../themes/entities/theme.entity';
import { FarmEntity } from '../farms/entities/farm.entity';
import { CommonEntity } from '../common/common-entity';

@Entity({ name: 'farm_theme' })
export class FarmThemeEntity extends CommonEntity {
  @ManyToOne(() => ThemeEntity, (theme) => theme.farmThemes)
  theme: ThemeEntity;

  @ManyToOne(() => FarmEntity, (farm) => farm.farmThemes)
  farm: FarmEntity;
}
