import { Injectable } from '@nestjs/common';
import { SnsType } from '../enums/sns.type';

@Injectable()
export class OptionsService {
  findSnsOptions(): typeof SnsType {
    return SnsType;
  }
}
