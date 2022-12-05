import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FarmAttachment } from '../farms.attachments/farm.attachment';
import { OpeningHour } from '../opening.hours/opening.hour';
import { Pricing } from '../pricings/pricing';
import { FarmTheme } from '../farms.themes/farm.theme';
import { CommonEntity } from '../bases/common.entity';
import { FarmUrl } from '../farms.urls/farm.url';

@Entity()
export class Farm extends CommonEntity {
  @Column({ length: 50 })
  name: string;

  @Column({ length: 16 })
  mainPhone: string;

  @Column({ length: 16 })
  alternatePhone: string;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 100 })
  detailAddress: string;

  @Column({ type: 'text' })
  directions: string;

  @Column({ length: 64 })
  email: string;

  @Column({ type: 'text' })
  ownerNotes: string;

  @Column({ length: 2000 })
  hashTags: string;

  @Column({ type: 'text' })
  conveniences: string;

  @Column()
  isReservationCancelable: boolean;

  @Column({ type: 'text' })
  refundPolicy: string;

  @Column({ type: 'text' })
  adminNotes: string;

  @Column()
  isActive: boolean;

  @OneToMany(() => FarmTheme, (farmTheme) => farmTheme.farm)
  farmThemes: FarmTheme[];

  @OneToMany(() => OpeningHour, (openingHour) => openingHour.farm)
  openingHours: OpeningHour[];

  @OneToMany(() => Pricing, (pricing) => pricing.farm)
  pricing: Pricing[];

  @OneToMany(() => FarmAttachment, (farmAttachment) => farmAttachment.farm)
  attachments: FarmAttachment[];

  // farms.urls
  @OneToMany(() => FarmUrl, (farmUrl) => farmUrl.farm)
  urls: FarmUrl[];
}
