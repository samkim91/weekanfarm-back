import { Injectable } from '@nestjs/common';
import { CreateFarmPricingDto } from '../dtos/create-farm-pricing.dto';
import { UpdateFarmsPricingDto } from './dtos/update-farms-pricing.dtos';

@Injectable()
export class FarmsPricingsService {
  create(createFarmsPricingDto: CreateFarmPricingDto) {
    return 'This action adds a new farmsPricing';
  }

  findAll() {
    return `This action returns all farmsPricings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} farmsPricing`;
  }

  update(id: number, updateFarmsPricingDto: UpdateFarmsPricingDto) {
    return `This action updates a #${id} farmsPricing`;
  }

  remove(id: number) {
    return `This action removes a #${id} farmsPricing`;
  }
}
