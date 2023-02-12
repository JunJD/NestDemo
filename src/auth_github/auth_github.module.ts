import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthGithubService } from './auth_github.service';
import { AuthGithubController } from './auth_github.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthMiddleware } from 'src/middlewares/auth.middlewares';
@Module({
  imports: [HttpModule],
  controllers: [AuthGithubController],
  providers: [AuthGithubService]
})
// export class AuthGithubModule {}
export class AuthGithubModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
