import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from './configs/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors
  app.enableCors(corsConfig);

  // global error catch
  // const httpAdapter = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);
}

bootstrap();
