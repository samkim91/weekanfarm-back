import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { FarmAttachmentEntity } from './farm-attachment.entity';
import { OpeningHourEntity } from '../../opening-hours/opening-hour.entity';
import { PricingEntity } from '../../pricings/pricing.entity';
import { CommonEntity } from '../../common/common-entity';
import { FarmUrlEntity } from '../../farms-urls/farm-url.entity';
import { ThemeEntity } from '../../themes/entities/theme.entity';

@Entity({ name: 'farm' })
export class FarmEntity extends CommonEntity {
  @Column({ length: 50 })
  name: string;

  @Column({ length: 16 })
  mainPhone: string;

  @Column({ length: 16, default: '' })
  alternatePhone: string;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 100, default: '' })
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

  @ManyToMany(() => ThemeEntity, { eager: true })
  @JoinTable()
  themes: ThemeEntity[];

  @OneToMany(() => OpeningHourEntity, (openingHour) => openingHour.farm, {
    cascade: true,
    eager: true,
  })
  openingHours: OpeningHourEntity[];

  @OneToMany(() => PricingEntity, (pricing) => pricing.farm, {
    cascade: true,
    eager: true,
  })
  pricing: PricingEntity[];

  @OneToMany(
    () => FarmAttachmentEntity,
    (farmAttachment) => farmAttachment.farm,
    { cascade: true, eager: true },
  )
  attachments: FarmAttachmentEntity[];

  // farms-urls
  @OneToMany(() => FarmUrlEntity, (farmUrl) => farmUrl.farm, {
    cascade: true,
    eager: true,
  })
  urls: FarmUrlEntity[];
}
