import * as morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.use(morgan('tiny'));
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  await app.listen(PORT, () =>
    console.log(`<(^_^)> running on -> http://localhost:${PORT}`),
  );
}
bootstrap();
