import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { FarmEntity } from './farm.entity';
import { CommonEntity } from '../../common/common-entity';

@Entity({ name: 'pricing' })
export class FarmPricingEntity extends CommonEntity {
  @Column({ length: 256 })
  eventName: string;

  @Column({ type: 'bigint' })
  cost: number;

  @Column({ type: 'time', default: '00:00:00' })
  playtime: string;

  @ManyToOne(() => FarmEntity, (farm) => farm.pricings, { onDelete: 'CASCADE' })
  @JoinColumn()
  farm: FarmEntity;
}
