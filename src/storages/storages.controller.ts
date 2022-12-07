import { Controller } from '@nestjs/common';
import { StoragesService } from './storages.service';

@Controller('storages')
export class StoragesController {
  constructor(private readonly storagesService: StoragesService) {}
}
