import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

const whitelist = [
  'http://localhost:3000',
  'https://41room.islab.dev',
  'https://api-41room.islab.dev',
];

const dirList = [
  'uploads',
  'uploads/users',
  'uploads/plant',
  'uploads/community',
];

async function bootstrap() {
  console.log(process.env.NODE_ENV);
  const cors: CorsOptions | boolean =
    process.env.NODE_ENV === 'development'
      ? {
          origin: '*',
          methods: ['POST', 'PUT', 'DELETE', 'GET'],
          credentials: true,
        }
      : {
          origin: whitelist,
          methods: ['POST', 'PUT', 'DELETE', 'GET'],
          credentials: true,
        };

  console.log(cors);
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors(cors);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(json({ limit: '500mb' }));
  app.use(urlencoded({ limit: '500mb', extended: true }));

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  dirList.forEach((item) => {
    if (!fs.existsSync(item)) {
      // uploads 폴더가 존재하지 않을시, 생성합니다.
      fs.mkdirSync(item);
    }
  });

  await app.listen(port);
}
bootstrap();
