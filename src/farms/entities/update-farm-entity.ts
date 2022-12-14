import { UpdateFarmDto } from '../dto/update-farm.dto';
import { FarmEntity } from './farm.entity';

export const updateFarmEntity = (
  farmEntity: FarmEntity,
  updateFarmDto: UpdateFarmDto,
) => {
  farmEntity.name = updateFarmDto.name ? updateFarmDto.name : farmEntity.name;
  farmEntity.mainPhone = updateFarmDto.mainPhone
    ? updateFarmDto.mainPhone
    : farmEntity.mainPhone;
  farmEntity.alternatePhone = updateFarmDto.alternatePhone
    ? updateFarmDto.alternatePhone
    : farmEntity.alternatePhone;
  farmEntity.address = updateFarmDto.address
    ? updateFarmDto.address
    : farmEntity.address;
  farmEntity.detailAddress = updateFarmDto.detailAddress
    ? updateFarmDto.detailAddress
    : farmEntity.detailAddress;
  farmEntity.directions = updateFarmDto.directions
    ? updateFarmDto.directions
    : farmEntity.directions;
  farmEntity.email = updateFarmDto.email
    ? updateFarmDto.email
    : farmEntity.email;
  farmEntity.ownerNotes = updateFarmDto.ownerNotes
    ? updateFarmDto.ownerNotes
    : farmEntity.ownerNotes;
  farmEntity.hashTags = updateFarmDto.hashTags
    ? updateFarmDto.hashTags
    : farmEntity.hashTags;
  farmEntity.conveniences = updateFarmDto.conveniences
    ? updateFarmDto.conveniences
    : farmEntity.conveniences;
  farmEntity.isReservationCancelable = updateFarmDto.isReservationCancelable
    ? updateFarmDto.isReservationCancelable
    : farmEntity.isReservationCancelable;
  farmEntity.refundPolicy = updateFarmDto.refundPolicy
    ? updateFarmDto.refundPolicy
    : farmEntity.refundPolicy;
  farmEntity.adminNotes = updateFarmDto.adminNotes
    ? updateFarmDto.adminNotes
    : farmEntity.adminNotes;
  farmEntity.isActive = updateFarmDto.isActive
    ? updateFarmDto.isActive
    : farmEntity.isActive;
};
