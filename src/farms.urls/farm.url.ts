import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from '../bases/common.entity';
import { SnsType } from '../enums/sns.type';
import { Farm } from '../farms/farm';

@Entity()
export class FarmUrl extends CommonEntity {
  @Column({ length: 2100 })
  address: string;

  @Column()
  type: typeof SnsType;

  @ManyToOne(() => Farm, (farm) => farm.urls)
  farm: Farm;
}
