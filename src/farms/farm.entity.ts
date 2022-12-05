import { Column, Entity, OneToMany } from 'typeorm';
import { FarmAttachmentEntity } from '../farms-attachments/farm-attachment.entity';
import { OpeningHourEntity } from '../opening-hours/opening-hour.entity';
import { PricingEntity } from '../pricings/pricing.entity';
import { FarmThemeEntity } from '../farms-themes/farm-theme.entity';
import { CommonEntity } from '../bases/common-entity';
import { FarmUrlEntity } from '../farms-urls/farm-url.entity';

@Entity({ name: 'farm' })
export class FarmEntity extends CommonEntity {
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

  @Column({ default: false })
  isReservationCancelable: boolean;

  @Column({ type: 'text' })
  refundPolicy: string;

  @Column({ type: 'text' })
  adminNotes: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => FarmThemeEntity, (farmTheme) => farmTheme.farm)
  farmThemes: FarmThemeEntity[];

  @OneToMany(() => OpeningHourEntity, (openingHour) => openingHour.farm)
  openingHours: OpeningHourEntity[];

  @OneToMany(() => PricingEntity, (pricing) => pricing.farm)
  pricing: PricingEntity[];

  @OneToMany(
    () => FarmAttachmentEntity,
    (farmAttachment) => farmAttachment.farm,
  )
  attachments: FarmAttachmentEntity[];

  // farms-urls
  @OneToMany(() => FarmUrlEntity, (farmUrl) => farmUrl.farm)
  urls: FarmUrlEntity[];
}
