import * as env from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
env.config();

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('EcoMap API')
    .setDescription('The EcoMap API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.enableCors({origin: true});

  const port = process.env.PORT || '3000';
  logger.log('App is running on port: ' + port);
  await app.listen(port);
}
bootstrap();
