import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from '../bases/common-entity';
import { SnsType } from '../enums/sns.type';
import { FarmEntity } from '../farms/entities/farm.entity';

@Entity({ name: 'farm_url' })
export class FarmUrlEntity extends CommonEntity {
  @Column({ length: 2100 })
  address: string;

  @Column()
  type: SnsType;

  @ManyToOne(() => FarmEntity, (farm) => farm.urls)
  farm: FarmEntity;
}
