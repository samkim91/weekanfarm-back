import { Column, Entity, ManyToOne } from 'typeorm';
import { FarmEntity } from '../farms/entities/farm.entity';
import { DayOfWeek } from '../enums/day.of.week';
import { CommonEntity } from '../bases/common-entity';

@Entity({ name: 'opening_hour' })
export class OpeningHourEntity extends CommonEntity {
  @Column()
  dayOfWeek: DayOfWeek;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @ManyToOne(() => FarmEntity, (farm) => farm.openingHours)
  farm: FarmEntity;
}
