import { Column, Entity, ManyToOne } from 'typeorm';
import { Farm } from '../farms/farm';
import { DayOfWeek } from '../enums/day.of.week';
import { CommonEntity } from '../bases/common.entity';

@Entity()
export class OpeningHour extends CommonEntity {
  @Column()
  dayOfWeek: typeof DayOfWeek;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @ManyToOne(() => Farm, (farm) => farm.openingHours)
  farm: Farm;
}
