import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './controllers/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://gracious-murdock-814e34.netlify.app',
      'https://relief-app-dev.oleksandrdemian.tech',
    ],
  });
  await app.listen(3099);
}
bootstrap();
