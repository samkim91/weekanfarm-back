import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Farm extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  // themes

  // openingHours

  // pricing

  // images

  // urls
}
