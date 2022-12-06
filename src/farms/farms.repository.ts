import { FarmEntity } from './entities/farm.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FarmsRepository extends Repository<FarmEntity> {}
