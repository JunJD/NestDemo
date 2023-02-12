import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGithubModule } from './auth_github/auth_github.module';
import { CorsMiddleware } from './middlewares/cors.middlewares';
import { User } from './entities/user.entity'; //
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [
    UsersModule,
    AuthGithubModule,
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
    // TypeOrmModule.forFeature([User, Strategy]),
    // UserModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
