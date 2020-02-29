import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from "./auth/auth.middleware";
import routes from "./routes";

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(...routes);
  }
}
