import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "dotenv/config";
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'

async function bootstrap() {
  const expressApp = express();
  expressApp.disable('x-powered-by');
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter); 

  const config = new DocumentBuilder()
  .setTitle('Endpoints de CRUD Usuarios')
  .setVersion('1.0')
  .addTag('Proyecto')
  .build()

  const document = SwaggerModule.createDocument(app, config)

  const OpenApiSpecification =
    app.use(
      '/docs',
      apiReference({
        content: document,
      }),
    );

  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
