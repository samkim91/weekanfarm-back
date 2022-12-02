import { Injectable, Logger } from '@nestjs/common';
import { FarmsRepository } from './farms.repository';

@Injectable()
export class FarmsService {
  private readonly logger = new Logger(FarmsService.name);
  constructor(private farmsRepository: FarmsRepository) {}
}
