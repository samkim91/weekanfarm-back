import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../common/common-entity';
import { SnsType } from '../../enums/sns.type';
import { FarmEntity } from './farm.entity';

@Entity({ name: 'farm_url' })
export class FarmUrlEntity extends CommonEntity {
  @Column({ length: 2100 })
  address: string;

  @Column()
  type: SnsType;

  @ManyToOne(() => FarmEntity, (farm) => farm.urls, { onDelete: 'CASCADE' })
  @JoinColumn()
  farm: FarmEntity;
}
