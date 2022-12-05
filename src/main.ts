import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { typeORMConfig } from './configs/typeorm.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
