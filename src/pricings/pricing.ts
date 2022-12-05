import { Column, Entity, ManyToOne } from 'typeorm';
import { Farm } from '../farms/farm';
import { CommonEntity } from '../bases/common.entity';

@Entity()
export class Pricing extends CommonEntity {
  @Column()
  eventName: string;

  @Column()
  cost: number;

  @Column()
  playTime: Date;

  @ManyToOne(() => Farm, (farm) => farm.pricing)
  farm: Farm;
}
