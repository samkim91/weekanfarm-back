import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { FarmEntity } from './farm.entity';
import { DayOfWeek } from '../../enums/day.of.week';
import { CommonEntity } from '../../common/common-entity';

@Entity({ name: 'opening_hour' })
export class FarmOpeningHourEntity extends CommonEntity {
  @Column()
  dayOfWeek: DayOfWeek;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @ManyToOne(() => FarmEntity, (farm) => farm.openingHours, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  farm: FarmEntity;
}
