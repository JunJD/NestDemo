import { Controller, forwardRef, Inject, Post, Req } from '@nestjs/common';
// import { User } from 'src/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('monitor')
export class MonitorController {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('xhr/monitor')
  async signupLocal(@Req() req: any): Promise<boolean> {
    console.log(req.body);
    return true;
  }
}
