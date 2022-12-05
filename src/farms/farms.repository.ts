import { InjectRepository } from '@nestjs/typeorm';
import { FarmEntity } from './farm.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FarmsRepository extends Repository<FarmEntity> {}
