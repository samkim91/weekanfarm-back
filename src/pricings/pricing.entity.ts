import { Column, Entity, ManyToOne } from 'typeorm';
import { FarmEntity } from '../farms/farm.entity';
import { CommonEntity } from '../bases/common-entity';

@Entity({ name: 'pricing' })
export class PricingEntity extends CommonEntity {
  @Column({ length: 256 })
  eventName: string;

  @Column({ type: 'bigint' })
  cost: number;

  @Column({ type: 'time' })
  playTime: string;

  @ManyToOne(() => FarmEntity, (farm) => farm.pricing)
  farm: FarmEntity;
}
