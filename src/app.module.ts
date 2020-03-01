import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from "./auth/auth.middleware";
import { PlacesModule } from './places/places.module';
import routes from "./routes";
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [TypeOrmModule.forRoot(), PlacesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(...routes);
  }
}
