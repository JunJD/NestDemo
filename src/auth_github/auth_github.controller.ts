import { Controller, Get, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGithubService } from './auth_github.service';

@Controller('oauth')
export class AuthGithubController {
  constructor(private readonly authGithubService: AuthGithubService) {}
  @Get('redirect')
  oauth(@Req() req):  {me: string}{
    return this.authGithubService.oauth(req.query);
  }
}
