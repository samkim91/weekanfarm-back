import { Controller, Get } from '@nestjs/common';
import { FarmsService } from './farms.service';

@Controller('farms')
export class FarmsController {
  constructor(private farmsService: FarmsService) {}

  @Get()
  getFarms(): string {
    return 'good';
  }
}
