import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // поддержка CORS для обработки http запросов из разных источников
  app.enableCors();

  await app.listen(4000);
}

bootstrap().then(() => {});
