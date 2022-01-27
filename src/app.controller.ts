import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { NoToken, NoTransfInterceptor } from './decorator/request.decort';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @NoToken()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/nologin/health')
  @NoToken()
  @NoTransfInterceptor()
  health(): object {
    return {
      status: 'UP',
    };
  }
}
