import { NestFactory } from '@nestjs/core';
import { AppModule } from './controllers/app/app.module';

async function bootstrap() {
  // todo: move to fastify
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  await app.listen(process.env.PORT || 3099);
}
bootstrap();
