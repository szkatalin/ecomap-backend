import * as env from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
env.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.enableCors();

  const port = process.env.PORT || '80';
  console.log('App is running on port: ' + port);
  await app.listen(port);
}
bootstrap();
