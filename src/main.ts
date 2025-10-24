import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import path, { join } from 'node:path';
import { writeFileSync } from 'node:fs';

async function bootstrap() {
  const expressApp = express();
  expressApp.disable('x-powered-by');
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
  );

  app.enableCors({
    origin: '*',
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
  SwaggerModule.setup('docs', app, document);
  writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
  app.useStaticAssets(join(__dirname, '..')); 

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
