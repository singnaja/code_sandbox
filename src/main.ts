

import { AppModule } from './app.module';
import { Body, ValidationPipe } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import env from './utils/env';
import { json, urlencoded } from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors();
  app.setGlobalPrefix('v1'); 
  // Swagger
  const options = new DocumentBuilder()
    .setTitle("demo-app-api")
    .setVersion("1.0.0")
    .setDescription("Demo System API")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
  
  await app.listen(configService.get(env.PORT));
}
bootstrap();