import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('ab*cd')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('login')
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('login')
}
