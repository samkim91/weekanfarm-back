import { InjectRepository } from '@nestjs/typeorm';
import { Farm } from './Farm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FarmsRepository extends Repository<Farm> {}
