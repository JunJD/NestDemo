import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CorsMiddleware } from './middlewares/cors.middlewares';
import { User } from './entities/user.entity'; //
import { UserModule } from './modules/user/user.module';
import { MonitorModule } from './modules/monitor/monitor.module';
@Module({
  imports: [
    UserModule,
    MonitorModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Djj12345.',
      database: 'nestjs',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
