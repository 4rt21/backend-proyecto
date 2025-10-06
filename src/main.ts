import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';
import path from 'path';

async function bootstrap() {
  const expressApp = express();
  expressApp.disable('x-powered-by');
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
  );

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const publicPath = path.join(__dirname, '..', 'public');
  app.useStaticAssets(publicPath);

  const config = new DocumentBuilder()
    .setTitle('Endpoints de CRUD Usuarios')
    .setVersion('1.0')
    .addTag('Proyecto')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const OpenApiSpecification = app.use(
    '/docs',
    apiReference({
      content: document,
    }),
  );

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
